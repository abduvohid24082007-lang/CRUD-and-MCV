const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post.controller");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
