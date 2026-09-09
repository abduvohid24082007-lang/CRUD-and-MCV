import React, { useEffect, useState } from "react";
import { getPosts, updatePost, deletePost } from "../api/post";
import { toast } from "sonner";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    published: false,
  });

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Posts olishda xatolik:", error);
      toast.error(error.message || "Postlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Inputlarni o'zgartirish
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Edit tugmasi
  const handleEdit = (post) => {
    setEditingId(post.id);

    setForm({
      title: post.title || "",
      content: post.content || "",
      published: post.published || false,
    });
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      toast.error("Title va contentni to‘ldiring");
      return;
    }

    try {
      const updatedPost = await updatePost(editingId, form);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingId
            ? {
                ...post,
                ...updatedPost,
              }
            : post,
        ),
      );

      toast.success("Post yangilandi");

      setEditingId(null);

      setForm({
        title: "",
        content: "",
        published: false,
      });
    } catch (error) {
      toast.error(error.message || "Postni yangilashda xatolik");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu postni o‘chirmoqchimisiz?");

    if (!confirmDelete) return;

    try {
      await deletePost(id);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      toast.success("Post o‘chirildi");
    } catch (error) {
      toast.error(error.message || "Postni o‘chirishda xatolik");
    }
  };

  // Editni bekor qilish
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      title: "",
      content: "",
      published: false,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-500">Postlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Posts</h1>

          <p className="mt-2 text-slate-500">Barcha postlar ro‘yxati</p>
        </div>

        {/* Edit Form */}
        {editingId && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-800">
              Postni tahrirlash
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Title */}
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Post title"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              />

              {/* Content */}
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Post content"
                rows="5"
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              />

              {/* Published */}
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                Published
              </label>

              {/* Buttons */}
              <div className="flex gap-3">
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
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-500">Hozircha postlar mavjud emas.</p>
          </div>
        ) : (
          /* Posts */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* ID */}
                <p className="mb-3 text-sm font-medium text-slate-400">
                  Post #{post.id}
                </p>

                {/* Title */}
                <h2 className="mb-3 text-xl font-semibold text-slate-800">
                  {post.title}
                </h2>

                {/* Content */}
                <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                  {post.content}
                </p>

                {/* Published + Author */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      post.published
                        ? "bg-slate-100 text-slate-700"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>

                  {post.author && (
                    <span className="text-sm text-slate-500">
                      {post.author.name}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
