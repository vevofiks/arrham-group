"use client"
import React from "react";
import { supportData } from "../data";
import { Montserrat as MontserratFont } from "next/font/google";
import { Handshake } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {motion} from "motion/react";
const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function Support() {
  return (
    <div className="min-h-screen text-white m-10 p-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto py-12 px-4 md:px-8 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide"
        >
          {supportData.title}{" "}
          <Handshake className="inline mb-2 ml-2 text-emerald-400" size={40} />
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 ${montserrat.className}`}
        >
          {supportData.description}
        </motion.p>
      </div>

      {/* Support Cards */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {supportData.sections.map((section, index) => {
            const phoneNumber = section.contact.phone.replace(/\D/g, "");
            const message = encodeURIComponent(
              `Hello, I need assistance with ${section.title.toLowerCase()}. Can you help me?`
            );
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-emerald-400/40 
                  bg-gradient-to-br from-gray-900/70 via-teal-900/40 to-emerald-800/30 
                  backdrop-blur-lg shadow-lg shadow-black/30
                  p-6 hover:shadow-emerald-800/40 hover:border-emerald-400/70
                  transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {section.title}
                </h3>

                <p
                  className={`text-gray-300 mb-6 leading-relaxed ${montserrat.className}`}
                >
                  {section.description}
                </p>

                <div className="flex justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-emerald-400 bg-emerald-500/10 
                      px-5 py-2.5 font-semibold text-emerald-300 cursor-pointer
                      hover:bg-emerald-400/20 hover:text-white hover:border-emerald-300 
                      transition duration-200"
                  >
                    Connect <FaWhatsapp size={20} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Support;
