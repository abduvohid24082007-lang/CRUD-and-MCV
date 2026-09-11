const { z } = require("zod");
const registerSchema = z.object({
  name: z.string().min(3, "ism kamida 3ta harafdan iborat boslishi kerak"),
  email: z.string().email("email togri firmatda bolishi kerak"),
  password: z
    .string()
    .min(6, "parol kamida 6 ta belgidan iborat bolishi kerak"),
});
const loginSchema = z.object({
  email: z.string().email("email notogriu formatda"),
  password: z.string().min(1, "parol kiritilishi shart"),
});
module.exports = { registerSchema, loginSchema };
