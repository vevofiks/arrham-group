"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
// Ensure you have installed: npm i react-zoom-pan-pinch
import CertificateModal from "./CertificateModal";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


const Certificates = ({
  certificates = [],
  lColor = "", 
  rColor = "",
  id = "",
  companyName = "",
}) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no data, don't render section
  if (!certificates || certificates.length === 0) return null;

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  const isHealthcare = id === "arrham-healthcare-bahrain";
  
  // Theme for cards
  const cardTheme = isHealthcare 
    ? "bg-white border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-xl hover:border-teal-100"
    : "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-500/10";

  const hasGradient = Boolean(lColor && rColor);  
  // Construct gradient strings from props
  const gradientText = `bg-gradient-to-r ${lColor} ${rColor} bg-clip-text text-transparent`;

  return (
    <section className="py-16 w-full relative z-10">
      <div className="w-full px-4">

         <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 uppercase ${montserrat.className}`}
          >
            {hasGradient ? (
              <span
                className="text-transparent bg-clip-text font-extrabold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})`,
                }}
              >
                Our Certifications
              </span>
            ) : (
              <span className="text-emerald-400">Our Certifications</span>
            )}
          </h2>
          {lColor && rColor && lColor != "rgb(52, 211, 153)" ? (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 mb-8 bg-linear-to-r from-teal-400 to-blue-500 mx-auto rounded-full"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 mb-8 flex mx-auto bg-emerald-400 rounded-full"
            />
          )}

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Recognized for excellence and commitment to quality standards
          </p>
        </motion.div>


        
        {/* --- CARDS CONTAINER --- */}
        <motion.div
          // Flex layout for tight centering + reduced gap
          className="flex flex-wrap justify-center gap-5 w-full"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate._id} // Using the _id from your data
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className={`
                group relative overflow-hidden rounded-2xl 
                w-full md:w-[350px] flex-grow-0
                flex flex-col
                transition-all duration-500 cursor-pointer
                ${cardTheme}
              `}
              onClick={() => openModal(certificate)}
            >
              {/* Card Body */}
              <div className="p-5 flex flex-col h-full">
                
                {/* Image Container - TALLER (h-64) */}
                <div className="relative w-full h-64 mb-5 rounded-xl overflow-hidden shadow-sm bg-gray-900/5">
                  <Image
                    src={certificate.img} // Using img from your data
                    alt={certificate.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                        <ExternalLink className="w-5 h-5 text-white" />
                     </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3
                    className={`text-xl font-bold ${
                      id === "healthcare" ? "text-black" : "text-emerald-300"
                    }`}
                  >
                    {certificate.name}
                  </h3>
                  <p
                    className={`${
                      id === "healthcare" ? "text-gray-700" : "text-gray-400"
                    } text-sm leading-relaxed line-clamp-3"`}
                  >
                    {certificate.description}
                  </p>

                  {/* Branch Badge */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className={`text-xs ${ id === "healthcare" ? "text-gray-500" :" text-white" } uppercase tracking-wider`}>
                      {companyName}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- MODAL --- */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        certificate={selectedCert}
        id={id}
        companyName={companyName}
        lColor={lColor}
        rColor={rColor}
      />
    </section>
  );
};

export default Certificates;