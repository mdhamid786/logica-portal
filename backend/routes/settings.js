const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController"); 


router.get("/", settingsController.getSettings);
router.get("/:id", settingsController.getSettingsById);
router.post("/", settingsController.createSettings);
router.put("/:id", settingsController.updateSettings);
router.delete("/:id", settingsController.deleteSettings);

module.exports = router;
