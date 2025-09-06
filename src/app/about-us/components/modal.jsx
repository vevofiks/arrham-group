"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ isOpen, onClose, project }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="modal-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80"
        >
          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl 
              bg-gradient-to-b from-gray-900 via-teal-900/80 to-emerald-800/90 
              shadow-2xl shadow-emerald-900/50 backdrop-blur-md
              max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
              onClick={onClose}
            >
              <X size={28} />
            </button>

            {/* Title */}
            {project?.name && (
              <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-white font-bold mt-8 mb-6 px-6">
                {project.name}
              </h2>
            )}

            {/* Image wrapper */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] px-6 mb-8">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                <Image
                  src={project?.img || "/arrham3.png"}
                  alt={project?.name || "project image"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Description */}
            {project?.description && (
              <p className="text-gray-200 text-center text-base leading-relaxed px-8 pb-10">
                {project.description}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
