const express = require('express');
const router = express.Router();
const {
	getProductbyId,
	createProduct,
	getProduct,
	photo,
	removeProduct,
	updateProduct,
	getAllProducts,
	getAllUniqueCategories,
} = require('../controllers/product');
const { getUserbyId } = require('../controllers/user');
const { isSingnedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

router.param('userId', getUserbyId);
router.param('productId', getProductbyId);

//Create Route
router.post('/product/create/:userId', isSingnedIn, isAuthenticated, isAdmin, createProduct);

router.get('/product/:productId', getProduct);

router.get('/product/photo/:productId', photo);

// Delete
router.delete('/product/:productId/:userId', isSingnedIn, isAuthenticated, isAdmin, removeProduct);

// Update
router.put('/product/:productId/:userId', isSingnedIn, isAuthenticated, isAdmin, updateProduct);

//Get All products
router.get('/product/', getAllProducts);

router.get('/product/categories', getAllUniqueCategories);
module.exports = router;
