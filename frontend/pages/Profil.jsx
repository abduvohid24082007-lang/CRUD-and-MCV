import React from "react";

function Profil() {
  const data = JSON.parse(localStorage.getItem("user"));

  if (!data || !data.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-500">Foydalanuvchi topilmadi</p>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-2xl font-semibold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        </div>

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
      </div>
    </div>
  );
}

export default Profil;
