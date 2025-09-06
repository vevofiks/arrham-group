"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  return (
    <div id="modal-scroll" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/50">
        
      <div
        className="relative w-full max-h-[90vh] overflow-y-auto rounded-xl 
        bg-gradient-to-br from-black/95 via-teal-900/90 to-emerald-950/90 
        shadow-xl shadow-emerald-900/50 
        max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl"
      >
        <button
          className="absolute top-3 right-3 text-gray-100 hover:text-white transition cursor-pointer"
          onClick={onClose}
        >
          <X size={28} />
        </button>

        {project?.name && (
          <h2 className="text-center text-lg sm:text-xl md:text-2xl text-white font-semibold mt-6 mb-4 px-4">
            {project.name}
          </h2>
        )}

        <div className="relative w-full h-60 sm:h-72 md:h-96 lg:h-[400px] px-4 sm:px-8 mb-6">
          <Image
            src={project?.img || "/arrham3.png"}
            alt={project?.name || "project image"}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        {project?.description && (
          <p className="text-gray-200 text-center text-sm sm:text-base px-6 pb-6">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default Modal;
