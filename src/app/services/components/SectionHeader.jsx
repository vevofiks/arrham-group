"use client";

import { motion } from "motion/react";

const SectionHeader = ({ title, subtitle }) => {
  const words = title.split(" "); // split once and reuse

  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl uppercase font-extrabold"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={i === words.length - 1 ? "text-lgreen" : "text-white"}
          >
            {word}{" "}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg text-white/70 mt-4 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="w-24 h-1 bg-lgreen mx-auto mt-6 rounded-full"></div>
    </div>
  );
};

export default SectionHeader;
