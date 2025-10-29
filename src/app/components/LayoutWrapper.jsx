"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "sonner";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const phone = "+97317473535";
  const message = "Hello, I came from your website and want to know more.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      <Toaster richColors position="top-right" />

      {!isAdmin && (
        <>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group z-50 fixed bottom-4 right-10 flex items-center justify-center
                w-16 h-16 rounded-full bg-transparent shadow-lg cursor-pointer
                transition-all duration-500 ease-out
                hover:bg-gradient-to-br hover:from-green-400 hover:to-green-500
                hover:scale-110 hover:shadow-[0_0_35px_12px_rgba(37,211,102,0.55)]"
          >
            <FaWhatsapp
              size={36}
              className=" text-green-500 transition-colors duration-300 group-hover:text-white"
            />
          </a>
          <Footer />
        </>
      )}
    </>
  );
}