"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Map from "./Map";
import { usePathname } from "next/navigation";
import { branchesData } from "..";
const Footer = () => {
  const pathname = usePathname();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const companyData = branchesData.branches.find(
    (branch) => branch.id === pathname.split("/")[2]
  );
  const location = companyData?.map;

  // console.log(companydata)
  console.log(pathname.split("/")[1]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  console.log(pathname, "path name on footer");

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer
      id="footer"
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400"></div>

      <div className="relative pt-16 pb-8 px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Grid */}
          <div className="flex flex-col justify-center md:flex-row items-start md:justify-between gap-20">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            {/* Company Info */}
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  width={120}
                  height={120}
                  alt="Arrham Group Logo"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {/* <span className="text-sm">Nuwaidrat, Bahrain</span> */}
                  <span className="text-sm max-w-2xl">
                    {" "}
                    ARRHAM TRADING AND CONTRACTING W.L.L Mr. Shabab 1445A &
                    1445G, Road 4630, Block 646, Nuwaidrat, Sitrah 644 Bahrain
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">+973 1747 3535</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@arrhamgroup.com"
                    target="_blank"
                    className="text-sm"
                  >
                    info@arrhamgroup.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="mr-5 w-auto">
              <h3 className="text-lg font-bold mb-6 relative ">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-lgreen to-teal-400"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about-us" },
                  { name: "Automotive", href: "/automotive" },
                  { name: "Architectural", href: "/architectural" },
                  // { name: "Commercial Window", href: "/commercial-window" },
                  { name: "MEP Services", href: "/mep" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-lgreen transition-all duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-lgreen group-hover:w-2 transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Map */}
            {pathname.split("/")[1] === "about-us" && (
              <motion.div variants={itemVariants}>
                <Map lat={location?.lat} lon={location?.lon} />
              </motion.div>
            )}
          </div>

          {/* Bottom Bar */}
          <motion.div
  variants={itemVariants}
  className="relative mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-start"
>
  {/* Text aligned to start */}
  <div className="text-center md:text-left">
    <p className="text-white/60 text-sm">
      © {new Date().getFullYear()} Arrham Trading and Contracting. All
      rights reserved.
    </p>
    <p className="text-white/40 text-xs mt-1">
      Website developed by{" "}
      <span className="text-lgreen font-medium">Vevofiks</span>
    </p>
  </div>

  {/* Button absolutely centered */}
  <motion.button
    onClick={scrollToTop}
    className="
      absolute left-1/2 -translate-x-1/2
      top-0 mt-[-3rem]   /* on mobile, bump it above the text */
      md:mt-0 md:top-auto md:bottom-0 /* reset for desktop */
      p-3 bg-gradient-to-r from-lgreen to-teal-500 rounded-full
      text-black cursor-pointer
      hover:shadow-lg hover:shadow-lgreen/25 transition-all
    "
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    title="Scroll to top"
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
