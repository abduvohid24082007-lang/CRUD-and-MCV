const { z } = require("zod");

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Sarlavha kamida 3 ta belgidan iborat bo‘lishi kerak"),
  content: z
    .string()
    .min(10, "Matn kamida 10 ta belgidan iborat bo‘lishi kerak"),
  authorId: z.number().int().positive("authorId musbat son bo‘lishi kerak"),
  published: z.boolean().optional(),
});

const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  published: z.boolean().optional(),
  viewCount: z.number().int().positive().optional(),
  likes: z.number().int().positive().optional(),
  authorId: z.number().int().positive().optional(),
});

module.exports = { createPostSchema, updatePostSchema };
