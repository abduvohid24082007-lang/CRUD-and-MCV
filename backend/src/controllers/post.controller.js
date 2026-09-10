const prisma = require("../prisma");

const getAllPosts = async (req, res) => {
  try {
    const { published, sortBy } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === "true";
    }

    const orderBy =
      sortBy === "likes" ? { likes: "desc" } : { createdAt: "desc" };

    const posts = await prisma.post.findMany({
      where,
      include: { author: true },
      orderBy,
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
    if (!post) {
      return res.status(404).json({ success: false, error: "Post topilmadi" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, authorId, published } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
        published: published !== undefined ? published : false,
      },
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) {
      return res.status(404).json({ success: false, error: "Post topilmadi" });
    }

    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: "Post o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
