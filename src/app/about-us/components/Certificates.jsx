'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { X, ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';

const Certificates = ({ certificates = [] , lColor = "" , rColor = "" }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const hasGradient = Boolean(lColor && rColor)

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Award className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
              Certifications
            </span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {hasGradient ? (
              <span
                className="text-transparent bg-clip-text font-bold"
                style={{ backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})` }}
              >
                Our Certifications
              </span>
            ) : (
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
                Our Certifications
              </span>
            )}
          </h2>
          <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-emerald-400 mx-auto rounded-full mb-8"
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Recognized for excellence and commitment to quality standards
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate._id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer"
              onClick={() => openModal(certificate)}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-6">
                {/* Certificate Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <div className="relative w-full h-48">
                    <Image
                      src={certificate.img}
                      alt={certificate.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {certificate.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {certificate.description}
                  </p>
                  
                  {/* Branch Badge */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {certificate.branchId}
                    </span>
                  </div>
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
            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Certificates Available</h3>
            <p className="text-gray-500">Certificates will be displayed here when available.</p>
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
            className="relative bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative w-full h-64">
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
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedCertificate.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">Comany: </span>
                      <span className="text-sm text-white font-medium">
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
    </section>
  );
};

export default Certificates;
