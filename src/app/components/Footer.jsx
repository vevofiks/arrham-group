"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Map from "./Map";
import { branchesData } from "..";

const Footer = () => {
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const segments = pathname?.split("/") || [];
  const currentPath = segments[1];
  const branchId = segments[2];

  const companyData = branchesData?.branches?.find(
    (b) => b.id === branchId
  );

  const location = companyData?.map;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const newLocal = "absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-teal-500";
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-500 via-teal-400 to-cyan-400"></div>

      <div className="relative pt-16 pb-8 px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
            
            {/* Company Info */}
            <motion.div variants={itemVariants} className="flex-1">
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  width={120}
                  height={120}
                  alt="Arrham Group Logo"
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-white/70 hover:text-teal-400 transition cursor-pointer group">
                  <MapPin className="w-5 h-5 mt-0.5 group-hover:animate-bounce" />
                  <div className="text-sm max-w-sm">
                    <span className="block font-semibold text-white mb-1">
                      {companyData?.name ||
                        "ARRHAM TRADING AND CONTRACTING W.L.L"}
                    </span>
                    <span className="block leading-relaxed">
                      {companyData?.contact?.address ||
                        "Building 1445A & 1445G, Road 4630, Block 646, Nuwaidrat, Sitrah 644 Bahrain"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70 hover:text-teal-400 transition">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">
                    {companyData?.contact?.phone || "+973 1747 3535"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/70 hover:text-teal-400 transition">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${
                      companyData?.contact?.email || "info@arrhamgroup.com"
                    }`}
                    className="text-sm"
                  >
                    {companyData?.contact?.email || "info@arrhamgroup.com"}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-auto">
              <h3 className="text-lg font-bold mb-6 relative">
                Quick Links
                <div className={newLocal}></div>
              </h3>

              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about-us" },
                  { name: "What's New", href: "/news" },
                  // { name: "Architectural", href: "/architectural" },
                  // { name: "MEP Services", href: "/mep" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-teal-400 transition flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-teal-400 group-hover:w-2 transition"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Map */}
            {currentPath === "about-us" && hydrated && (
              <motion.div variants={itemVariants} className="flex-1 w-full">
                <Map
                  key={`${branchId}-${location?.lat}-${location?.lon}`}
                  lat={location?.lat}
                  lon={location?.lon}
                />
              </motion.div>
            )}
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="relative mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between"
          >
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Arrham Trading and Contracting.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Website developed by <span className="text-teal-400">Vevofiks</span>
              </p>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="absolute left-1/2 -translate-x-1/2 top-0 md:relative md:left-auto md:translate-x-0 p-3 bg-linear-to-r from-teal-600 to-teal-400 rounded-full text-white hover:shadow-lg hover:shadow-teal-500/25 transition"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
