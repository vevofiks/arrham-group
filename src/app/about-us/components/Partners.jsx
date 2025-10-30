'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ExternalLink, Users, X } from 'lucide-react';
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const colorMap = {
  'teal-600': '#0d9488',
  'blue-600': '#2563eb',
  'emerald-300': '#6ee7b7',
  'emerald-400': '#34d399',
  'emerald-600': '#059669',
  'blue-400': '#60a5fa',
};

const Partners = ({ partnerships = [], lColor = '', rColor = '', id = '' }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const toExternalUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  const isHealthcare = id === 'healthcare';
  const hasGradient = Boolean(lColor && rColor);

  // Motion variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
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
        isHealthcare ? 'text-gray-900' : ' text-white'
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

          <h2
            className={`text-2xl md:text-3xl lg:text-3xl font-bold mb-6 uppercase ${montserrat.className}`}
          >
            {hasGradient ? (
              <span
                className="text-transparent bg-clip-text font-extrabold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${colorMap[lColor]}, ${colorMap[rColor]})`,
                }}
              >
                Our Partners
              </span>
            ) : (
              <span className={isHealthcare ? 'text-teal-600' : 'text-emerald-400'}>
                Our Partners
              </span>
            )}
          </h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-24 h-1 mb-8 mx-auto rounded-full ${
              isHealthcare
                ? 'bg-gradient-to-r from-teal-500 to-blue-500'
                : 'bg-gradient-to-r from-emerald-400 to-teal-500'
            }`}
          />

          <p
            className={`max-w-2xl mx-auto text-lg ${
              isHealthcare ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            Collaborating with leading companies and organizations worldwide
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {partnerships.map((partner) => (
            <motion.div
              key={partner.branchId}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }}
              onClick={() => openModal(partner)}
              className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                isHealthcare
                  ? 'bg-gray-100 border-gray-200 hover:shadow-xl hover:shadow-teal-200/40'
                  : 'bg-gray-200 border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:shadow-emerald-500/20'
              }`}
            >
              {/* Glow effects */}
              {!isHealthcare && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              )}

              <div className="relative z-10 p-6">
                {/* Partner Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <div className="relative w-full h-48">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                </div>

                {/* Partner Info */}
                <div className="space-y-3">
                  <h3
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isHealthcare
                        ? 'text-gray-900 group-hover:text-teal-700'
                        : 'text-white group-hover:text-emerald-300'
                    }`}
                  >
                    {partner.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed line-clamp-3 ${
                      isHealthcare ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {partner.description || 'Trusted partner and collaborator.'}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isHealthcare ? 'bg-teal-500' : 'bg-emerald-400'
                      }`}
                    ></div>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        isHealthcare ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      {partner.branchId}
                    </span>
                  </div>
                </div>
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
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Partners Available</h3>
            <p className="text-gray-500">Partners will be displayed here when available.</p>
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
                ? 'bg-white border-gray-200'
                : 'bg-white/10 border-white/20'
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
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  : 'bg-white/20 hover:bg-white/30 text-white'
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
                      isHealthcare ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {selectedPartner.name}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      isHealthcare ? 'text-gray-700' : 'text-gray-300'
                    }`}
                  >
                    {selectedPartner.description ||
                      'Partnering with us for growth and innovation.'}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isHealthcare ? 'bg-teal-500' : 'bg-emerald-400'
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          isHealthcare ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        Company:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          isHealthcare ? 'text-gray-900' : 'text-white'
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
