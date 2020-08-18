const User = require('../models/User')
const Order = require('../models/Order')


exports.getUserbyId = (req, res, next, id) => {
	User.findById(id).select('-password').exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User Not Found here"
			})
		}
		req.profile = user;
		next()
	})
}

// get user by ID
exports.getUser = (req, res) => {
	return res.json(req.profile)
}

// get All User For local
exports.getAllUser = (req, res) => {

	User.find().sort('-1').exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User Not Found here"
			})
		}
		res.json({
			users: user
		})
	})
}

// Update User
exports.updateUser = (req, res) => {

	User.findByIdAndUpdate({
		_id: req.profile._id
	}, {
		$set: req.body
	}, {
		new: true,
		useFindAndModify: false
	}).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: "User Not Able To Update "
			})
		}
		user.password = undefined
		return res.json(user)
	})
}

// user ParchedList
exports.userParchedList = (req, res) => {
	Order.find({
			user: req.profile._id
		}).populate('user', [_id, name])
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "No Order in This Account"
				})
			}
			return res.json(order)
		})
}

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.porducts.foEach((product) => {
		purchases.push({
			_id: req.product._id,
			name: product.name,
			description: product.description,
			categroy: product.categroy,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id
		})
	})

	// Store in the DB

	User.findOneAndUpdate(

		{
			_id: req.profile._id
		}, {
			$push: purchases
		}, {
			new: true
		},
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Unable to Save purchase"
				})
			}
			next()
		}
	)

}