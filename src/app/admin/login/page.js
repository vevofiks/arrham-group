"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // motion/react → framer-motion
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({ username: "", password: "" });

    // Client-side validation
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setUsername("");
        setPassword("");
        router.push("/admin/dashboard"); // redirect after login
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-white/80 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.username ? "focus:ring-red-400" : "focus:ring-lgreen"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-lgreen"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-lgreen to-teal-500 text-black font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Arrham Admin Panel
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
