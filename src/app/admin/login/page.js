"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const router = useRouter();

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(6, "At least 6 characters"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });

    try {
      await loginSchema.validate({ username, password }, { abortEarly: false });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back, Admin!");
        router.push("/admin/news");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#0a0a0c] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-1"
      >
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <motion.div 
                initial={{ y: -20 }} 
                animate={{ y: 0 }} 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20"
            >
              <Lock className="text-gray-900" size={32} />
            </motion.div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-gray-400 mt-2">Secure access for Arrham Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border ${errors.username ? "border-red-500/50" : "border-white/10"} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white/10 transition-all`}
                  placeholder="admin_user"
                />
              </div>
              <AnimatePresence>
                {errors.username && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-xs ml-1">{errors.username}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/5 border ${errors.password ? "border-red-500/50" : "border-white/10"} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white/10 transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-xs ml-1">{errors.password}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="relative w-full mt-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-950 font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                "Sign In"
              )}
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-400 text-xs tracking-widest">
            © {new Date().getFullYear()} Arrham Admin Panel
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;