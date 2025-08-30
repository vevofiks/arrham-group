"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ServiceCard = ({ image, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-lgreen/30 hover:border-lgreen transition-all duration-500 cursor-pointer group"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
      </div>

      <div className="p-6 text-left">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lgreen transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
