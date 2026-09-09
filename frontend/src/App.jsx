import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import UserDetails from "../pages/UserDetails";
import PostDetails from "../pages/PostDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main>
        <Routes>
          {/* Users */}
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />

          {/* Posts */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
