const express = require('express');
const router = express.Router();
const {
	getCategoryById,
	createCategory,
	getAllCategory,
	getCategory,
	updateCategory,
	removeCategory,
} = require('../controllers/category');
const { getUserbyId } = require('../controllers/user');
const { isAdmin, isAuthenticated, isSingnedIn } = require('../controllers/auth');

// params
router.param('userId', getUserbyId);
router.param('catgeoryId', getCategoryById);

// routes goes here

router.post('/category/create/:userId', isSingnedIn, isAuthenticated, isAdmin, createCategory);

// read
router.get('/category/:catgeoryId', getCategory);
router.get('/allcategory', getAllCategory);
// Update
router.put('/category/:catgeoryId/:userId', isSingnedIn, isAuthenticated, isAdmin, updateCategory);

// Delete
router.delete('/category/:catgeoryId/:userId', isSingnedIn, isAuthenticated, isAdmin, removeCategory);
module.exports = router;
