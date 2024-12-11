const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const nextJsPublicPath = path.join(__dirname, '..', '..', 'dash', 'public', 'uploads');
    if (!fs.existsSync(nextJsPublicPath)) {
      fs.mkdirSync(nextJsPublicPath, { recursive: true });
    }
    cb(null, nextJsPublicPath);
  },
  filename: (req, file, cb) => {

    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg, .png, .pdf, and .webp files are allowed!'));
  }
});

module.exports = upload;