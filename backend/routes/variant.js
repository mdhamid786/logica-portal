const express = require("express");
const router = express.Router();
const path = require('path');
const variantController = require("../controllers/veriantController");
const upload = require('../middleware/multer');
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Variant routes
router.post("/",upload.array('images', 10), variantController.createVariant); 
router.get("/:productId", variantController.getVariantsForProduct); 
router.get("/variant/:variantId", variantController.getVariantDetails);
router.put("/:variantId",upload.array('images', 10), variantController.updateVariant);
router.delete("/:variantId", variantController.deleteVariant);

module.exports = router;
 