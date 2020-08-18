const express = require('express');
const router = express.Router();
const {
    getUserbyId,
    pushOrderInPurchaseList
} = require('../controllers/user');
const {
    isSingnedIn,
    isAuthenticated,
    isAdmin
} = require('../controllers/auth');

const {
    getOrderId,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require('../controllers/order')
const {
    updateStock
} = require('../controllers/product')

// Params
router.param('userId', getUserbyId);
router.param('orderId', getOrderId)


// create Order

router.post('/order/create/:userId', isSingnedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

// get All Order
router.get("/order/all/:userId", isSingnedIn, isAuthenticated, isAdmin, getAllOrders)


// Status of Order

router.get('/order/status/:userId', isSingnedIn, isAuthenticated, isAdmin, getOrderStatus)

// update
router.put('/order/:orderId/status/:userId', isSingnedIn, isAuthenticated, isAdmin, updateStatus)
module.exports = router