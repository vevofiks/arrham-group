"use client";

import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl uppercase font-extrabold"
      >
        {title.split(" ").map((word, i) => (
          <span
            key={i}
            className={
              word.toLowerCase() === "services" ||
              word.toLowerCase() === "products"
                ? "text-lgreen"
                : "text-white"
            }
          >
            {word}{" "}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
