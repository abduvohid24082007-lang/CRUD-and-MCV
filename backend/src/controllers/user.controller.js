const prisma = require("../prisma");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: { select: { post: true } },
      },
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        _count: { select: { post: true } },
      },
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User topilmadi" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "nimadur xato ketdi" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: "User o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
