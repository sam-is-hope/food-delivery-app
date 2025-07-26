const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, placeOrder);
router.get('/', auth, getOrders);

module.exports = router;
