const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signout, signup, signin, isSingnedIn } = require('../controllers/auth');

// @ method    POST /api/signup
// @ desc      signup a user
// @ assces     Public
router.post(
	'/signup',
	[
		body('name', 'Name is required..').not().isEmpty(),
		body('email', 'Email is required...').isEmail(),
		body('password', 'Password Should be at least 3 Char').isLength({
			min: 3,
		}),
	],
	signup
);

// @ method    POST /api/signin
// @ desc      signin a user
// @ assces     Public
router.post(
	'/signin/',
	[body('email', 'Email is required...').isEmail(), body('password', 'Password is required...').not().isEmpty()],
	signin
);

// @ method    POST /api/singout
// @ desc      singout a user
// @ assces     Prative
router.get('/singout/', signout);

router.get('/test', isSingnedIn, (req, res) => {
	res.json(req.auth);
});
module.exports = router;
