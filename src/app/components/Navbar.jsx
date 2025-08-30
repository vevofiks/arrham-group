"use client";

import Image from "next/image";
import { navLinks } from "../data";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Montserrat as MontserratFont } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setDropdown] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  const toggleDropdown = (name) => {
    setDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3 },
    },
    solid: {
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)",
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const handleLinkClick = (path, href) => {
    setIsMobileMenuOpen(false);
  
    if (pathname === path) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(path + href);
    }
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        animate={isScrolled ? "solid" : "transparent"}
        className={`fixed top-0 left-0 right-0 z-50 px-10 md:px-24 py-8 transition-all duration-300  ${
          isScrolled ? "shadow-lg border-b-lgreen" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            <img src="/arrham2.png" alt="logo" width={170} height={170} />
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={link.name} className="relative">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick(link.path, link.href)}
                  className={`${montserrat.className} flex items-center gap-1 text-white hover:text-lgreen font-medium transition-colors duration-200`}
                >
                  {link.name}
                  {link.subLinks && (
                    <span className="text-xs">
                      {openDropdown === link.name ? (
                        <ChevronUp onClick={() => toggleDropdown(null)} />
                      ) : (
                        <ChevronDown
                          onClick={() => toggleDropdown(link.name)}
                        />
                      )}
                    </span>
                  )}
                </motion.button>

                {link.subLinks && openDropdown === link.name && (
                  <div className="absolute left-0 mt-2 bg-black text-white  rounded-lg shadow-lg w-56 border border-white/20 z-50">
                    {link.subLinks.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className={`${montserrat.className} block px-4 py-2 text-sm hover:bg-lgreen/20 hover:text-lgreen`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.path, sub.href);
                          setDropdown(null);
                        }}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-black/10 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden bg-black border-[0.2px] border-white mt-4 rounded-lg shadow-lg"
            >
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <button
                      onClick={() => {
                        if (link.subLinks) {
                          toggleDropdown(link.name);
                        } else {
                          handleLinkClick(link.path, link.href);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`${montserrat.className} flex justify-between items-center w-full px-4 py-3 text-white hover:text-lgreen font-medium hover:bg-lgreen/10 rounded-lg`}
                    >
                      {link.name}
                      {link.subLinks && (
                        <span className="text-xs">
                          {openDropdown === link.name ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      )}
                    </button>

                    {link.subLinks && openDropdown === link.name && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.subLinks.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-white hover:text-lgreen hover:bg-lgreen/10 rounded-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(link.path, sub.href);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
