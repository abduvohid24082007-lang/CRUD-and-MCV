import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getMe, updateUser, uploadAvatar } from "../api/users";
import { getImageUrl } from "../src/untils/imageUrl";

function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const readUserFromStorage = () => {
    try {
      const raw = JSON.parse(localStorage.getItem("user"));
      return raw?.user || raw || null;
    } catch (e) {
      return null;
    }
  };

  const saveUserToStorage = (updatedUser) => {
    try {
      const raw = JSON.parse(localStorage.getItem("user"));
      if (raw?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...raw, user: updatedUser }),
        );
      } else {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (e) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const loadProfile = async () => {
    const localUser = readUserFromStorage();
    if (!localUser) {
      setLoading(false);
      return;
    }

    setUser(localUser);
    setForm({ name: localUser.name || "", email: localUser.email || "" });

    try {
      const freshUser = await getMe();
      setUser(freshUser);
      setForm({ name: freshUser.name || "", email: freshUser.email || "" });
      saveUserToStorage(freshUser);
    } catch (error) {
      // Server bilan bog'lanib bo'lmasa, localStorage'dagi ma'lumot bilan qolamiz
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setForm({ name: user.name || "", email: user.email || "" });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({ name: user.name || "", email: user.email || "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateUser(user.id, {
        name: form.name,
        email: form.email,
      });
      setUser(updated);
      saveUserToStorage(updated);
      setIsEditing(false);
      toast.success("Profil yangilandi");
    } catch (error) {
      toast.error(error.message || "Profilni yangilashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Faqat rasm fayl yuklashingiz mumkin");
      return;
    }

    setUploading(true);
    try {
      const result = await uploadAvatar(file);
      const updatedUser = result.user || result;
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
      toast.success("Avatar yangilandi");
    } catch (error) {
      toast.error(error.message || "Avatar yuklashda xatolik");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-500">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-500">Foydalanuvchi topilmadi</p>
      </div>
    );
  }

  const avatarUrl = getImageUrl(user.avatar);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user.name}
                className="h-20 w-20 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-2xl font-semibold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs text-white shadow transition hover:bg-slate-700 disabled:opacity-50"
              title="Rasmni o'zgartirish"
            >
              {uploading ? "…" : "✎"}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        </div>

        {!isEditing ? (
          <>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Ism</span>
                <span className="font-medium text-slate-800">{user.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-800">{user.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEditToggle}
              className="mt-6 w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Tahrirlash
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSave}
            className="mt-6 space-y-3 border-t border-slate-100 pt-6"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ism"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                {saving ? "Saqlanmoqda..." : "Saqlash"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profil;
