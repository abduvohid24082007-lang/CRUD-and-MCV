const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
module.exports = router;
