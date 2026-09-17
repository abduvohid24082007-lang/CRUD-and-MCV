const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    (cb, (null, `avatar-${req.user.userId}-${uniqueSuffix}${ext}`));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("faqat jpeg,png webp rasimlarni yuklash mumkin"));
  }
};
