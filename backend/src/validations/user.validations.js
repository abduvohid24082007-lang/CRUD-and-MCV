const { z, email } = require("zod");
const createUserSchema = z.object({
  name: z.string().min(3, "ism kamida 3ta belidan iborat bolishi kerak"),
  email: z.string().email("email notogri fromtda"),
  password: z.string().min(6, "parol kamida 6 ta belgidan iboratbolishi kerak"),
});

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
module.exports = { createUserSchema, updateUserSchema };
