const express = require("express");
const {
  addNewBrand,
  brandList,
  singleBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/", upload.single("brand_image"), addNewBrand);
router.get("/", brandList);
router.get("/:id", singleBrand);
router.put("/:id", upload.single("brand_image"), updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
