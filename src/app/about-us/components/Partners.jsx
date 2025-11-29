"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
 
import { ExternalLink, Users, X } from "lucide-react";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Partners = ({ partnerships = [], lColor = "", rColor = "", id = "" }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
      return trimmed;
    return `https://${trimmed}`;
  };

  // if you pass lColor and rColor they will be used as a right-to-left gradient (to left)
  const hasGradient = Boolean(lColor && rColor);
  const isHealthcare = id === "arrham-healthcare-bahrain";
  // Motion variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const openModal = (partner) => setSelectedPartner(partner);
  const closeModal = () => setSelectedPartner(null);

  return (
    <section
      id={id}
      className={`py-16 px-4 transition-colors duration-500 ${
        isHealthcare ? "text-gray-900" : " text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
<motion.div
  className="text-center mb-16"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <h2 className={`text-2xl md:text-3xl lg:text-3xl font-extrabold uppercase tracking-tight mb-7 ${montserrat.className}`}>
    {hasGradient ? (
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})` }}
      >
        Our Partners
      </span>
    ) : (
      <span className="text-white">Our Partners</span>
    )}
  </h2>

  {hasGradient ? (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-24 h-1 mx-auto rounded-full"
      style={{ backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})` }}
    />
  ) : (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-24 h-1 flex mx-auto bg-emerald-400 rounded-full"
    />
  )}

  <p
    className={`max-w-2xl mx-auto text-lg text-gray-400 mt-6`}
  >
    Collaborating with leading companies and organizations worldwide
  </p>
</motion.div>
        {/* Partners Grid (replacing carousel) */}
        <motion.div
          className="xl:max-w-[1290px] mx-auto flex flex-wrap justify-center gap-16"
          // variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {partnerships.map((partner) => (
            <motion.div key={partner._id} variants={cardVariants} className="group w-[140px]">
              <div className={`relative w-full aspect-square rounded-xl overflow-hidden border ${isHealthcare ? "bg-white border-gray-200" : "bg-white/5 border-white/10"} p-4 flex items-center justify-center`}>
                <Image
                  src={partner.img}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className={`${isHealthcare ? "text-gray-900" : "text-white"} font-medium text-sm sm:text-base`}>
                  {partner.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {partnerships.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Partners Available
            </h3>
            <p className="text-gray-500">
              Partners will be displayed here when available.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedPartner && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <motion.div
            className={`relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden backdrop-blur-xl border ${
              isHealthcare
                ? "bg-white border-gray-200"
                : "bg-white/10 border-white/20"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isHealthcare
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative w-full h-64">
                    <Image
                      src={selectedPartner.img}
                      alt={selectedPartner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isHealthcare ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {selectedPartner.name}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      isHealthcare ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {selectedPartner.description ||
                      "Partnering with us for growth and innovation."}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isHealthcare ? "bg-teal-500" : "bg-emerald-400"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          isHealthcare ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        Company:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          isHealthcare ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {selectedPartner.branchId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Partners;
