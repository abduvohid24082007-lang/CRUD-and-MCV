import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email kiriting";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "To'g'ri email manzilini kiriting";
      hasError = true;
    }

    if (!form.password.trim()) {
      newErrors.password = "Parol kiriting";
      hasError = true;
    } else if (form.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setLoading(true);

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user || res.data));

      toast.success("Tizimga muvaffaqiyatli kirdingiz!");

      setForm({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login qilishda xatolik yuz berdi";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Login
        </h2>

        <p className="text-center text-gray-500 mb-6">Welcome back!</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Kirilmoqda..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
