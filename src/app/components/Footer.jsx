"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { socialIcons } from "../data";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
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

  return (
    <footer id="footer" className="relative  text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400"></div>

      <div className="relative pt-20 pb-6 px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <Image
                  src="/arrham2.png"
                  width={160}
                  height={160}
                  alt="Arrham Group Logo"
                  />
                </div>
              </div>

              <p className="text-white/80 leading-relaxed mb-6 text-sm lg:text-base max-w-md">
                Arrham Group is a dynamic and innovative leader in{" "}
                <span className="text-lgreen font-semibold">
                  Engineering & Construction
                </span>{" "}
                and{" "}
                <span className="text-teal-400 font-semibold">
                  Automotive Services
                </span>
                , delivering exceptional quality and cutting-edge solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Nuwaidrat, Bahrain</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">+973 66332026</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-lgreen transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">info@arrhamtrading.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-lgreen to-teal-400"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Automotive", href: "/automotive" },
                  { name: "Architectural", href: "/architectural" },
                  { name: "Commercial Window", href: "/commercial-window" },
                  { name: "MEP Services", href: "/mep" },
                  { name: "About Us", href: "/about" },
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

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold mb-6 relative">
                Stay Updated
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-lgreen to-lgreen/50"></div>
              </h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Subscribe to receive updates about our latest projects and
                services.
              </p>

              <div className="mb-6">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-lgreen focus:bg-white/15 transition-all text-sm backdrop-blur-sm"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubscribed}
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-lgreen to-teal-500 px-4 py-2 rounded-lg text-black font-semibold hover:shadow-lg hover:shadow-lgreen/25 transition-all disabled:opacity-50 text-sm"
                  >
                    {isSubscribed ? "✓" : <Mail className="w-4 h-4" />}
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-lgreen text-xs mt-2">
                    Successfully subscribed!
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white/80">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">
                  {socialIcons.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`p-2.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 ${social.color} ${social.iconColor}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Arrham Trading and Contracting. All
                rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Website developed by{" "}
                <span className="text-lgreen font-medium">Vevofliks</span>
              </p>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-lgreen to-teal-500 rounded-full text-black hover:shadow-lg hover:shadow-lgreen/25 transition-all"
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
