


const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');


router.post('/create', ordersController.createOrder);
router.get('/:id', ordersController.getOrderWithDetails);
router.get('/', ordersController.getAllOrdersWithDetails);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.softDeleteOrder);
router.post('/status-change', ordersController.updateOrderStatus);

module.exports = router;
