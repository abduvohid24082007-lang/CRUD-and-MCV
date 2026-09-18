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
    console.log("Delete funksiya ishladi");
    const { id } = req.params;
    console.log(id);
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    console.log(user);
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: "User o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tizimga kirgan foydalanuvchining o'z ma'lumotlarini olish (token orqali)
const getMe = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        _count: { select: { post: true } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User topilmadi" });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Fayl yuklanmadi",
      });
    }

    const avatarPath = `/uploads/${req.file.filename}`;

    const userId = req.user.userId || req.user.id;

    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { avatar: avatarPath },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        avatar: avatarPath,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  uploadAvatar,
};
