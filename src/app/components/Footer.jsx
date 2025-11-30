"use client";


import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ArrowUp,
  MapPin,
  Phone,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Map from "./Map";
import { branchesData, groupCompanies } from "..";

const Footer = () => {
  const [hydrated, setHydrated] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(groupCompanies[0]);
  const pathname = usePathname();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const segments = pathname?.split("/") || [];
  const branchId = segments.length > 0 ? segments[segments.length - 1] : null;
  const isHomePage = pathname === "/";

  const companyData = branchesData?.branches?.find((b) => b.id === branchId);
  const location = companyData?.map;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden font-sans">
      {/* Background Pattern */}
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
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-7xl mx-auto"
        >
          {isHomePage ? (
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
              {/* Left Column: Logo & Quick Links */}
              <div
                className="w-full md:w-1/4 flex flex-col gap-10"
              >
                <div>
                  <Image
                    src="/logo.png"
                    width={140}
                    height={140}
                    alt="Arrham Group Logo"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider opacity-80">
                    Quick Links
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { name: "Home", href: "/" },
                      { name: "About Us", href: "/about-us" },
                      { name: "What's New", href: "/news" },
                      { name: "Privacy Policy", href: "/privacy-policy" },
                      { name: "Copyright", href: "/copyright" },
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-white/60 hover:text-teal-400 hover:pl-2 transition-all duration-300 text-sm flex items-center gap-3 group w-fit"
                        >
                          <span className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-teal-400 group-hover:w-3 transition-all duration-300"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-10 w-full">
                {/* Selector List */}
                <div  className="flex-1">
                  <h3 className="text-lg font-bold mb-6 text-teal-400">
                    Group Companies
                  </h3>
                  <div className="space-y-2">
                    {groupCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => setSelectedCompany(company)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border flex items-center justify-between group ${
                          selectedCompany.id === company.id
                            ? "bg-teal-900/30 border-teal-500/50 text-white"
                            : "bg-transparent border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div>
                          <span className="text-xs uppercase tracking-wider block mb-1 opacity-70">
                            {company.country}
                          </span>
                          <span className="font-semibold text-sm md:text-base">
                            {company.name}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            selectedCompany.id === company.id
                              ? "text-teal-400 translate-x-1"
                              : "opacity-0"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  variants={itemVariants}
                  className="flex-1 bg-zinc-900/40 p-6 rounded-2xl border border-white/5 h-fit relative overflow-hidden group/card"
                >
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">
                    Contact Details
                  </h4>

                  <motion.div
                    key={selectedCompany.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-teal-400 mb-2">
                        {selectedCompany.name}
                      </h3>
                      <p className="text-sm text-white/50">
                        {selectedCompany.country}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {selectedCompany.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                        <p className="text-gray-300 text-sm">
                          {selectedCompany.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                        <a
                          href="mailto:info@arrhamgroup.com"
                          className="text-gray-300 text-sm hover:text-white transition"
                        >
                          info@arrhamgroup.com
                        </a>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-6">
                      <Link
                        href={`/about-us/${selectedCompany.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-teal-400 transition-colors group/link"
                      >
                        Visit Company Page
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-start gap-20">
              <div className="flex-1">
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
              </div>

              <div className="w-auto">
                <h3 className="text-lg font-bold mb-6 relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-teal-500"></div>
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/about-us" },
                    { name: "What's New", href: "/news" },
                    { name: "Privacy Policy", href: "/privacy-policy" },
                    { name: "Copyright", href: "/copyright" },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-teal-400 transition flex items-center gap-2 group text-sm"
                      >
                        <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-teal-400 group-hover:w-2 transition"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {hydrated && location && (
                <div className="flex-1 w-full min-w-[300px]">
                  <Map key={`map-${branchId}`} location={location} />
                </div>
              )}
            </div>
          )}

          <motion.div
            variants={itemVariants}
            className="relative mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between"
          >
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Arrham Trading and Contracting.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Website developed by{" "}
                <span className="text-teal-400">Vevofiks</span>
              </p>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="absolute left-1/2 -translate-x-1/2 -top-12 md:top-0 md:relative md:left-auto md:translate-x-0 p-3 bg-linear-to-r from-teal-600 to-teal-400 rounded-full text-white hover:shadow-lg hover:shadow-teal-500/25 transition"
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