"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

const CertificateModal = ({
  isOpen,
  onClose,
  certificate,
  id,
  companyName,
  lColor = "",
  rColor = "",
}) => {
  const [showFullImage, setShowFullImage] = useState(false);

  if (!certificate) return null;

  const isHealthcare = id === "arrham-healthcare-bahrain";

  // Light/Dark Theme Logic
  const theme = isHealthcare
    ? {
        bg: "bg-white",
        text: "text-gray-900",
        subtext: "text-gray-600",
        closeBtn: "bg-gray-100 hover:bg-gray-200 text-gray-600",
      }
    : {
        bg: "bg-[#18181b] border border-white/10",
        text: "text-white",
        subtext: "text-gray-400",
        closeBtn: "bg-white/10 hover:bg-white/20 text-white",
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Main Modal Overlay */}
          {/* FIXED: Changed invalid 'z-100' to 'z-[100]' */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ${theme.bg}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image Area */}
              <div className="relative w-full bg-black/5 aspect-video flex items-center justify-center p-4">
                {/* Zoom Button */}
                <button
                  onClick={() => setShowFullImage(true)}
                  className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                  title="View Full Size"
                >
                  <ZoomIn size={18} />
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme.closeBtn}`}
                >
                  <X size={18} />
                </button>

                {/* The Image (Contained) */}
                <div className="relative w-full h-full">
                  <Image
                    src={certificate.img}
                    alt={certificate.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${theme.text}`}
                  style={{
                    background:
                      lColor && rColor
                        ? `linear-gradient(to right, ${lColor}, ${rColor})`
                        : undefined,
                    WebkitBackgroundClip: lColor && rColor ? "text" : undefined,
                    WebkitTextFillColor:
                      lColor && rColor ? "transparent" : undefined,
                  }}
                >
                  {certificate.name}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${theme.subtext}`}>
                  {certificate.description ||
                    "Official certification demonstrating our commitment to quality standards and excellence in operations."}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-500/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${theme.subtext}`}
                  >
                    {companyName}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Full Screen Image Overlay */}
          <AnimatePresence>
            {showFullImage && (
              <motion.div
                className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[110]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFullImage(false)}
              >
                {/* Full Screen Close Button */}
                <button
                  className="absolute top-5 right-5 text-white/70 hover:text-white p-2 bg-black/50 rounded-full z-[120] hover:scale-110 transition-all duration-200"
                  onClick={() => setShowFullImage(false)}
                >
                  <X size={32} />
                </button>

                <motion.div
                  className="relative w-full h-full max-w-5xl max-h-[90vh]"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()} 
                >
                  <Image
                    src={certificate.img}
                    alt={certificate.name}
                    fill
                    className="object-contain"
                    quality={100}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;