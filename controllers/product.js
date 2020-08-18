const User = require('../models/User');
const Product = require('../models/Product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { parseInt, sortBy } = require('lodash');

exports.getProductbyId = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, products) => {
			if (err) {
				return res.status(400).json('Product Not Found');
			}
			req.product = products;
			next();
		});
};

// Create Product

exports.createProduct = (req, res) => {
	let form = new formidable({
		keepExtensions: true,
	});

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: 'porblem with image',
			});
		}
		const { name, description, categroy, price, stock } = fields;

		if (!name || !description || !categroy || !price || !stock) {
			return res.status(400).json({
				error: 'Please Include all the fileds',
			});
		}
		let product = new Product(fields);
		// console.log(product)
		// handle file Here
		if (file.photo) {
			// console.log(file.photo)
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'File size is to Big',
				});
			}

			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		// save to database

		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: 'Saving T-shirt in DB filed',
				});
			}

			res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	// req.product.photo = undefined;
	return res.json(req.product);
};

// middle aware
exports.photo = (rq, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

// Delete

exports.removeProduct = (req, res) => {
	let product = req.product;
	product.remove((err, deleteProduct) => {
		if (err) {
			return res.status(400).json({
				error: 'Faild to Delete Product',
			});
		}
		return res.json({
			msg: ` ${deleteProduct} is SuccessFully Delete`,
		});
	});
};

// update

exports.updateProduct = (req, res) => {
	let form = new formidable({
		keepExtensions: true,
	});

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: 'porblem with image',
			});
		}
		const { name, description, categroy, price, stock } = fields;

		// updation code
		let product = req.product;
		product = _.extend(product, fields);

		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'File size is to Big',
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		// save to database
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: 'Updation of product failed...',
				});
			}

			res.json(product);
		});
	});
};

// Get All Products

exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	Product.find()
		.select('-photo')
		.limit(limit)
		.populate('category')
		.sort([[sortBy, 'asc']])
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'No Product  Found',
				});
			}

			return res.json(products);
		});
};

// Update inverory

exports.updateStock = (req, res, next) => {
	let myproduct = req.order.products.map((prod) => {
		return {
			updateOne: {
				filter: {
					_id: prod_id,
					update: { $inc: { stock: -prod.count, sold: +prod.count } },
				},
			},
		};
	});

	Product.bulkWrite(myproduct, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: 'Buld Operation Faild...',
			});
		}
	});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct('category', {}, (err, categorys) => {
		if (err) {
			return res.status(400).json({
				error: 'uinqure category Not Found',
			});
		}
		return res.json(categorys);
	});
};
