"use client";

import Sidebar from "./component/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // If on /admin/login, render only children (login page)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Otherwise, render sidebar and navbar
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="w-0 md:w-42 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <nav className="border-b border-slate-200/60 backdrop-blur-xl bg-white/70 sticky -top-8 z-40 ">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Arrham Group
                  </h1>
                  <p className="text-sm text-slate-500">Editorial Dashboard</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="cursor-pointer"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <LogOutIcon />
                </button>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
}
