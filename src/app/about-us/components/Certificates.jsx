'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { X, ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';
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

const Certificates = ({ certificates = [], lColor = '', rColor = '' }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const getGradientStyle = () => {
    if (lColor && rColor) {
      return {
        backgroundImage: `linear-gradient(to right, ${colorMap[lColor] || '#34d399'}, ${colorMap[rColor] || '#60a5fa'})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
    return { color: '#34d399' };
  };

  const getIconColor = () => {
    return colorMap[lColor] || '#34d399';
  };

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 ${montserrat.className}`}
          >
            <span style={getGradientStyle()} className="uppercase">
              Our Certificates
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: lColor && rColor
                ? `linear-gradient(to right, ${colorMap[lColor] || '#34d399'}, ${colorMap[rColor] || '#60a5fa'})`
                : '#34d399'
            }}
            className="w-24 h-1 mx-auto rounded-full mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-gray-600 text-lg max-w-2xl mx-auto ${montserrat.className}`}
          >
            Recognized for excellence and commitment to quality standards
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-teal-300"
              onClick={() => openModal(certificate)}
            >
              {/* Certificate Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={certificate.img}
                  alt={certificate.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300 ${montserrat.className}`}>
                  {certificate.name}
                </h3>
                <p className={`text-gray-600 leading-relaxed mb-4 line-clamp-3 ${montserrat.className}`}>
                  {certificate.description}
                </p>

                {/* Branch Badge */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getIconColor() }}
                  ></div>
                  <span className={`text-xs text-gray-500 uppercase tracking-wider ${montserrat.className}`}>
                    {certificate.branchId}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold text-gray-500 mb-2 ${montserrat.className}`}>
              No Certificates Available
            </h3>
            <p className={`text-gray-400 ${montserrat.className}`}>
              Certificates will be displayed here when available.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg border border-gray-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative w-full h-80">
                    <Image
                      src={selectedCertificate.img}
                      alt={selectedCertificate.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${montserrat.className}`}>
                      {selectedCertificate.name}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed ${montserrat.className}`}>
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getIconColor() }}
                      ></div>
                      <span className={`text-sm text-gray-500 ${montserrat.className}`}>Company: </span>
                      <span className={`text-sm text-gray-900 font-medium ${montserrat.className}`}>
                        {selectedCertificate.branchId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Certificates;