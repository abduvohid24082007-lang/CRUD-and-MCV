const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const userController = require("../controllers/user.controller");
const { createUserSchema } = require("../validations/user.validations");
const { updatePostSchema } = require("../validations/post.validations");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(updatePostSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
