// components/CertificateModal.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const CertificateModal = ({ 
  isOpen, 
  onClose, 
  certificate, 
  id, 
  companyName,
  lColor = "", 
  rColor = ""  
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const transformRef = useRef(null);

  // Reset zoom when modal opens
  useEffect(() => {
    if (isOpen) setIsZoomed(false);
  }, [isOpen, certificate]);

  const handleZoomToggle = () => {
    if (isZoomed) {
      transformRef.current?.resetTransform();
      setIsZoomed(false);
    } else {
      setIsZoomed(true);
    }
  };

  if (!certificate) return null;

  const isHealthcare = id === "arrham-healthcare-bahrain";

  // Dynamic Theme Logic
  const theme = isHealthcare
    ? {
        modalBg: "bg-white",
        border: "border-gray-200",
        title: "text-gray-900",
        desc: "text-gray-600",
        label: "text-gray-500",
        metaText: "text-gray-800",
        closeBtn: "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900",
        divider: "border-gray-100",
      }
    : {
        modalBg: "bg-white/10 backdrop-blur-xl",
        border: "border-white/20",
        title: "text-white",
        desc: "text-gray-300",
        label: "text-gray-400",
        metaText: "text-white",
        closeBtn: "bg-white/20 text-white hover:bg-white/30",
        divider: "border-white/20",
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <motion.div
            className={`relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border shadow-2xl ${theme.modalBg} ${theme.border}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm ${theme.closeBtn}`}
            >
              <X size={20} />
            </button>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                
                {/* --- COLUMN 1: IMAGE (With Zoom) --- */}
                <div className="relative w-full rounded-xl overflow-hidden bg-black/20 border border-white/5 shadow-inner">
                  {/* Zoom Toggle Button */}
                  <button
                    onClick={handleZoomToggle}
                    className="absolute top-3 left-3 z-20 p-2 rounded-full bg-black/60 text-white
                      hover:bg-black/80 transition-all duration-200 backdrop-blur-sm
                      hover:scale-110 active:scale-95 shadow-lg"
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>

                  {/* Image Container */}
                  <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
                    {isZoomed ? (
                      <div className="absolute inset-0 w-full h-full bg-black/50">
                        <TransformWrapper
                          ref={transformRef}
                          initialScale={1}
                          minScale={1}
                          maxScale={4}
                          wheel={{ step: 0.1 }}
                        >
                          <TransformComponent
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{ width: "100%", height: "100%" }}
                          >
                            <div className="relative w-full h-full flex items-center justify-center">
                              <Image
                                src={certificate.img}
                                alt={certificate.name}
                                fill
                                className="object-contain select-none"
                                draggable={false}
                              />
                            </div>
                          </TransformComponent>
                        </TransformWrapper>
                      </div>
                    ) : (
                      <Image
                        src={certificate.img}
                        alt={certificate.name}
                        fill
                        className="object-contain p-2"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                    <div>
                    <h3
                        className="text-2xl sm:text-3xl font-bold mb-3"
                        style={{
                        background: `linear-gradient(135deg, ${lColor}, ${rColor})`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        }}
                    >
                        {certificate.name}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${theme.desc}`}>
                        {certificate.description}
                    </p>
                    </div>

                    <div className={`space-y-3 pt-5 border-t ${theme.divider}`}>
                    {/* Company Metadata */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: `linear-gradient(135deg, ${lColor}, ${rColor})` }}
                        />
                        <span className={`text-sm ${theme.label}`}>Company: </span>
                        <span className={`text-sm font-semibold tracking-wide ${theme.metaText}`}>
                            {companyName}
                        </span>
                    </div>
              
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;