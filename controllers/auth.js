const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

//Controllers
exports.signup = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}
	const { name, lastname, email, password, role, userinfo, purchases } = req.body;

	User.findOne({ email }).exec((err, email) => {
		if (err) throw err;
		if (email) {
			return res.status(400).json({
				errors: 'Email already Exist',
			});
		}
		const user = new User({
			name,
			lastname,
			email,
			password,
			role,
			userinfo,
			purchases,
		});

		bcrypt.genSalt(10, function (err, salt) {
			if (err) throw err;
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) throw err;
				user.password = hash;
				user
					.save()
					.then((users) => {
						return res.json(users);
					})
					.catch((err) => {
						console.error(err.message);
						return res.status(400).json({
							error: 'Server Error',
						});
					});
			});
		});
	});
};

exports.signin = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}
	const { email, password } = req.body;

	// if user exists or not

	User.findOne({
		email,
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					errors: 'Invalid Credentials',
				});
			}
			//compare and match login
			bcrypt.compare(password, user.password, function (err, Match) {
				console.log(password);
				console.log(user.password);
				if (err) throw err;
				if (!Match) {
					return res.status(400).json({
						errors: 'Invalid Credentials',
					});
				} else {
					const token = jwt.sign(
						{
							_id: user._id,
						},
						process.env.SECRET,
						{
							expiresIn: '150h',
						}
					);
					res.cookie('token', token);
					res.json({
						token,
						user,
					});
				}
			});
		})
		.catch((err) => {
			console.error(err.message);
			return res.status(400).json({
				error: 'Server Error',
			});
		});
};

exports.signout = (req, res) => {
	res.clearCookie('token');
	res.json({
		error: 'User singout sucessfully',
	});
};

// protected routes
exports.isSingnedIn = expressjwt({
	secret: process.env.SECRET,
	userProperty: 'auth',
	algorithms: ['HS256'],
});

// middleware
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!checker) {
		res.status(403).json({
			error: 'Access Deined',
		});
	}
	next();
};
// is Admin
exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		res.status(403).json({
			error: 'your Not Admin , Access Deined',
		});
	}
	next();
};
