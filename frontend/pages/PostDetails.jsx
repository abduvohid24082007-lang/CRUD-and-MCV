import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../api/post";
import { toast } from "sonner";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        toast.error(error.message || "Postni olishda xatolik");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Post yuklanmoqda...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Post topilmadi</h1>

          <Link
            to="/posts"
            className="mt-4 inline-block rounded-lg bg-slate-800 px-4 py-2 text-white"
          >
            Postlarga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/posts"
          className="mb-6 inline-block text-sm text-slate-500 hover:text-slate-800"
        >
          ← Postlarga qaytish
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-slate-400">Post #{post.id}</span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                post.published
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-slate-800">
            {post.title}
          </h1>

          {post.author && (
            <p className="mt-4 text-sm text-slate-500">
              Author:{" "}
              <span className="font-medium text-slate-700">
                {post.author.name}
              </span>
            </p>
          )}

          <div className="my-6 border-t border-slate-100" />

          <p className="whitespace-pre-line text-base leading-8 text-slate-600">
            {post.content}
          </p>
        </article>
      </div>
    </div>
  );
}

export default PostDetails;
