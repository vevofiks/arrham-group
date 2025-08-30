"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ServiceDetail = ({ title, description, features, image }) => {
  return (
    <section className="py-20 px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-xl"
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
        <p className="text-lg text-white/70 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {features.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-white/80 hover:text-lgreen transition"
            >
              ✅ {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default ServiceDetail;
