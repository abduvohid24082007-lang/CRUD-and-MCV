import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api/users";
import UserModal from "../Modals/UserModal";
import { toast } from "sonner";

function Users() {
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Userslarni olish
  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      toast.error(error.message || "Userlarni olishda xatolik");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Inputlarni o'zgartirish
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Edit bosilganda
  const handleEdit = (user) => {
    setEditingId(user.id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      password: user.password || "",
    });
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUser(editingId, form);

      toast.success("User yangilandi");

      setEditingId(null);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      loadUsers();
    } catch (error) {
      toast.error(error.message || "Userni yangilashda xatolik");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu userni o‘chirmoqchimisiz?");

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success("User o‘chirildi");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      toast.error(error.message || "Userni o‘chirishda xatolik");
    }
  };

  // Editni bekor qilish
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  // Yangi user qo'shilganda
  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Users</h1>

            <p className="mt-2 text-slate-500">
              Barcha foydalanuvchilar ro‘yxati
            </p>
          </div>

          {/* Add User */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            + Add User
          </button>
        </div>

        {/* Edit Form */}
        {editingId && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-800">
              Userni tahrirlash
            </h2>

            <form onSubmit={handleUpdate} className="grid gap-4 md:grid-cols-3">
              {/* Name */}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row md:col-span-3">
                <button
                  type="submit"
                  className="rounded-lg bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
                >
                  Saqlash
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-5 py-3 font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Empty */}
        {users.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">Hozircha userlar mavjud emas.</p>
          </div>
        ) : (
          /* Users */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Name */}
                <h2 className="mb-2 text-xl font-semibold text-slate-800">
                  {user.name}
                </h2>

                {/* ID */}
                <p className="text-sm text-slate-500">ID: {user.id}</p>

                {/* Email */}
                {user.email && (
                  <p className="mt-2 break-all text-slate-600">{user.email}</p>
                )}

                {/* Buttons */}
                <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(user)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add User Modal */}
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      </div>
    </div>
  );
}

export default Users;
