import React, { useState } from "react";
import { createUser } from "../api/users";
import { toast } from "sonner";

function UserModal({ isOpen, onClose, onUserCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: form.name.trim() ? "" : "Ism kiritilishi shart",
      email: form.email.trim() ? "" : "Email kiritilishi shart",
      password: form.password.trim() ? "" : "Parol kiritilishi shart",
    };

    setErrors(newErrors);

    try {
      setLoading(true);

      const newUser = await createUser(form);

      toast.success("User muvaffaqiyatli qo'shildi");

      setForm({ name: "", email: "", password: "" });
      setErrors({ name: "", email: "", password: "" });

      onUserCreated(newUser);
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error("User qo'shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Add User</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 transition hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
