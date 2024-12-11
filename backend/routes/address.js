const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const {  authenticate } = require('../middleware/Authenticate');



 

router.post('/add',authenticate, addressController.addAddress);
router.get('/', authenticate, addressController.getUserAddresses);

router.get('/:id', authenticate, addressController.getSingleAddress);
router.put('/:id', authenticate, addressController.updateAddress);
router.delete('/:id', authenticate, addressController.deleteAddress);

router.put('/set-default/:id', authenticate, addressController.setDefaultAddress);

module.exports = router;
