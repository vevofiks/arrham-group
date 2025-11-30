"use client"
import React from "react";
import { supportData } from "./data";
import { Montserrat as MontserratFont } from "next/font/google";
import { Handshake, Clock, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {motion} from "motion/react";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white p-6 bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-3 uppercase tracking-wide flex items-center justify-center gap-3"
          >
            {supportData.title}
            <Handshake className="text-emerald-400" size={32} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-base md:text-lg text-gray-300 max-w-2xl mx-auto ${montserrat.className}`}
          >
            {supportData.description}
          </motion.p>
        </div>

        {/* Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
          {supportData.sections.map((section, index) => {
            const phoneNumberRaw = section.contact.phone.replace(/\D/g, "");
            const message = encodeURIComponent(
              `Hello, I need assistance with ${section.title.toLowerCase()}.`
            );
            const whatsappUrl = `https://wa.me/${phoneNumberRaw}?text=${message}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
                // Added 'h-full' here to ensure the card fills the grid height
                className="flex flex-col h-full rounded-xl border border-emerald-400/30 
                  bg-linear-to-br from-gray-900/80 via-teal-900/30 to-emerald-800/20 
                  backdrop-blur-md shadow-lg shadow-black/40
                  p-6 hover:shadow-emerald-900/30 hover:border-emerald-400/50
                  transition-all duration-300"
              >
                {/* Card Title & Desc */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className={`text-sm text-gray-400 leading-relaxed ${montserrat.className}`}>
                    {section.description}
                  </p>
                </div>

                {/* Contact Info (Compact) */}
                {/* 'grow' pushes the button section to the bottom */}
                <div className={`space-y-3 mb-6 text-sm text-gray-300 grow ${montserrat.className}`}>
                  <div className="flex items-center gap-3">
                    <Clock className="text-emerald-400 shrink-0" size={16} />
                    <span>{section.contact.availability}</span>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <Mail className="text-emerald-400 shrink-0" size={16} />
                    <a href={`mailto:${section.contact.email}`} className="hover:text-white hover:underline decoration-emerald-400/50 underline-offset-4 transition-colors">
                      {section.contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <Phone className="text-emerald-400 shrink-0" size={16} />
                    <a href={`tel:${phoneNumberRaw}`} className="hover:text-white hover:underline decoration-emerald-400/50 underline-offset-4 transition-colors">
                      {section.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Action Button */}
                {/* 'mt-auto' ensures this stays at the bottom of the flex container */}
                <div className="mt-auto">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 
                      px-4 py-2.5 text-sm font-semibold text-emerald-300 
                      hover:bg-emerald-400/20 hover:text-white hover:border-emerald-400/60 
                      transition duration-200"
                  >
                    Connect on WhatsApp <FaWhatsapp size={18} />
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

export default SupportPage;