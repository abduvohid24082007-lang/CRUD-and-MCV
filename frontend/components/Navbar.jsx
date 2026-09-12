import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Users", path: "/", icon: "👥" },
    { name: "Emails", path: "/emails", icon: "✉️" },
    { name: "Posts", path: "/posts", icon: "📝" },
    { name: "Names", path: "/names", icon: "👤" },
  ];

  const authLinks = [
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-bold text-white">
            A
          </div>
          <div className="text-lg font-bold text-gray-900">
            Admin<span className="text-gray-400">Panel</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white text-black shadow"
                    : "text-gray-500 hover:bg-white hover:text-black"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}

          {!user &&
            authLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-white text-black shadow"
                      : "text-gray-500 hover:bg-white hover:text-black"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">
              👤 {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Chiqish
            </button>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
            A
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;