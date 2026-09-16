const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post.controller");
const validate = require("../middlewares/validate");
const {
  createPostSchema,
  updatePostSchema,
} = require("../validations/post.validations");
const authMiddleware = require("../middlewares/auth");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);

router.post(
  "/",
  authMiddleware,
  validate(createPostSchema),
  postsController.createPost,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updatePostSchema),
  postsController.updatePost,
);
router.delete("/:id", authMiddleware, postsController.deletePost);

module.exports = router;
