import React, { useState } from "react";
import { createPosts } from "../api/post";

import { toast } from "sonner";

function PostModal({ isOpen, onClose, onPostCreated }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorId: "",
    published: false,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newPost = await createPost({
        title: form.title,
        content: form.content,
        authorId: Number(form.authorId),
        published: form.published,
      });

      toast.success("Post muvaffaqiyatli qo‘shildi");

      setForm({
        title: "",
        content: "",
        authorId: "",
        published: false,
      });

      onPostCreated(newPost);
      onClose();
    } catch (error) {
      toast.error(error.message || "Post qo‘shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Add Post</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            rows="5"
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <input
            type="number"
            name="authorId"
            value={form.authorId}
            onChange={handleChange}
            placeholder="Author ID"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

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

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-slate-800 px-4 py-3 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;
