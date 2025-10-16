"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Briefcase, Tags, Users, Handshake, Award } from "lucide-react";

const navItems = [
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Brands", href: "/admin/brands", icon: Tags },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-6 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-2xl p-4 border border-slate-200 w-44 space-y-1.5 transition-all z-50">
        <div className="mb-4 flex flex-col items-center">
          <span className="font-semibold text-lg text-indigo-700 tracking-wide">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all font-medium text-base ${
                  active
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-indigo-600"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow flex justify-around py-1.5 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center px-1.5 py-1 transition-all ${
                active
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-indigo-500"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
