const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

const upload = require('../middleware/multer');

router.post('/',upload.single('cat_image'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', upload.single('cat_image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
 