const express = require('express');
const router = express.Router();
const { getUserbyId, getUser, getAllUser, updateUser, userParchedList } = require('../controllers/user');
const { isAuthenticated, isSingnedIn, isAdmin } = require('../controllers/auth');
// @ method    GET api/user/
// @ desc      Get Logged in user
// @ assces     prative
router.param('userId', getUserbyId);

router.get('/user/:userId', isSingnedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSingnedIn, isAuthenticated, updateUser);

router.get('orders/user/:userId', isSingnedIn, isAuthenticated, userParchedList);

router.get('/users', getAllUser);
module.exports = router;
