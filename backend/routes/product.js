const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const productsController = require('../controllers/productController');

const upload = require('../middleware/multer');
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
router.put('/:id', upload.array('images', 10), productsController.updateProduct);

router.post('/', upload.array('images', 10), productsController.createProduct); 

router.get('/list', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.delete('/:id', productsController.deleteProduct);
router.get('/list/:slug', productsController.getProductBySlug);

module.exports = router;
