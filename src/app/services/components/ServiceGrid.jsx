"use client";

import { motion } from "motion/react";

const ServiceGrid = ({ services }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-lgreen shadow-lg hover:shadow-lgreen/20 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            {service.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGrid;
