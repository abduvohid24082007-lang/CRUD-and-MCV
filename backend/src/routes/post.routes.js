const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post.controller");
const validate = require("../middlewares/validate");
const {
  createPostSchema,
  updatePostSchema,
} = require("../validations/post.validations");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", validate(createPostSchema), postsController.createPost);
router.put("/:id", validate(updatePostSchema), postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
