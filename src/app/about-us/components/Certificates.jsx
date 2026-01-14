"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

  if (!certificates || certificates.length === 0) return null;

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  const isHealthcare = id === "healthcare";

  // Card Styling
  const cardTheme = isHealthcare
    ? "bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-100"
    : "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-emerald-500/10";

  const haslinear = Boolean(lColor && rColor);

  return (
    // FIXED: Removed 'z-10' to prevent stacking context trap.
    // Kept 'relative' for local positioning if needed, but 'z-index' was causing the fight with Navbar.
    <section className="py-16 w-full relative">
      <div className="w-full px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-4 uppercase ${montserrat.className}`}
          >
            {haslinear ? (
              <span
                className="text-transparent bg-clip-text"
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
          <div
            className={`w-16 h-1 mx-auto rounded-full ${haslinear ? "bg-linear-to-r from-teal-400 to-blue-500" : "bg-emerald-400"
              }`}
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 w-full"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate._id || certificate.id || Math.random()}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`
                group relative overflow-hidden rounded-xl 
                w-full max-w-[280px] grow-0 flex flex-col
                transition-all duration-300 cursor-pointer
                ${cardTheme}
              `}
              onClick={() => openModal(certificate)}
            >
              <div className="relative w-full h-48 p-4 flex items-center justify-center border-b border-gray-100/10">
                <div className="relative w-full h-full">
                  <Image
                    src={certificate.img}
                    alt={certificate.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3
                  className={`text-base text-center font-bold line-clamp-1 ${isHealthcare ? "text-gray-900" : "text-emerald-300"
                    }`}
                >
                  {certificate.name}
                </h3>

                <div className="flex items-center justify-center gap-2 mt-auto">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className={`text-[10px] ${isHealthcare ? "text-gray-500" : "text-white/60"} uppercase tracking-wider`}>
                    {companyName}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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