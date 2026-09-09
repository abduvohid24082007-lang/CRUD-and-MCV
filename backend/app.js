// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const prisma = require("./src/prisma");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(morgan("dev"));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const successResponse = (res, data, statusCode = 200) => {
//   return res.status(statusCode).json({ success: true, data });
// };

// const errorResponse = (res, message, statusCode = 400) => {
//   return res.status(statusCode).json({ success: false, error: message });
// };

// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     return successResponse(res, users);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     const { ism, email, password } = req.body;
//     if (!ism || !email || !password) {
//       return errorResponse(res, "Barcha maydonlar kerak", 400);
//     }
//     const user = await prisma.user.create({
//       data: { ism, email, password },
//     });
//     return successResponse(res, user, 201);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await prisma.user.findUnique({
//       where: { id: Number(id) },
//       include: {
//         _count: {
//           select: { post: true },
//         },
//       },
//     });

//     if (!user) {
//       return errorResponse(res, "Foydalanuvchi topilmadi", 404);
//     }

//     return successResponse(res, user);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const { published, sortBy } = req.query;
//     const where = {};
//     if (published !== undefined) {
//       where.published = published === "true";
//     }

//     const orderBy =
//       sortBy === "likes" ? { likes: "desc" } : { createdAt: "desc" };

//     const posts = await prisma.post.findMany({
//       where,
//       include: { author: true },
//       orderBy,
//     });
//     return successResponse(res, posts);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.post("/posts", async (req, res) => {
//   try {
//     const { title, content, authorId, published } = req.body;
//     if (!title || !content || !authorId) {
//       return errorResponse(res, "Title, content va authorId kerak", 400);
//     }
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         authorId: parseInt(authorId),
//         published: published !== undefined ? published : false,
//       },
//     });
//     return successResponse(res, post, 201);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.put("/posts/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const post = await prisma.post.update({
//       where: { id },
//       data: req.body,
//     });
//     return successResponse(res, post);
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.delete("/posts/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);

//     const post = await prisma.post.findUnique({
//       where: { id },
//     });

//     console.log("ID:", id);
//     console.log("POST:", post);

//     if (!post) {
//       return errorResponse(res, "Post topilmadi", 404);
//     }

//     await prisma.post.delete({
//       where: { id },
//     });

//     return successResponse(res, {
//       message: "Post o'chirildi",
//     });
//   } catch (err) {
//     return errorResponse(res, err.message, 500);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server ${PORT}-portda ishlamoqda`);
// });

// ////////////////////////////////////////////////////////////////////////

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./src/routes/user.routes");
const postRoutes = require("./src/routes/post.routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Blog api ishlamoqda" });
});

module.exports = app;
