import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { toast } from "sonner";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        User topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-slate-800">
            {user.name}
          </h1>

          <p className="mb-2 text-slate-500">ID: {user.id}</p>

          <p className="text-slate-600">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
