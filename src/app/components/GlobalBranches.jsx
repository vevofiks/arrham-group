"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Building2, Globe2, ArrowRight, MapPin } from "lucide-react";
import { branchesOverview } from "../data";

const GlobalBranches = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      id="branches"
      className="relative text-white pb-18 overflow-hidden mt-[200px]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-lgreen/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase"
          >
            Our <span className="text-lgreen">Global Presence</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1.5 bg-linear-to-r from-lgreen to-teal-400 mx-auto mt-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
          >
            Expanding across{" "}
            <span className="text-lgreen font-semibold">Saudi Arabia</span>,{" "}
            <span className="text-lgreen font-semibold">Bahrain</span>, and{" "}
            <span className="text-lgreen font-semibold">Canada</span>. We
            deliver excellence with every branch.
          </motion.p>
        </motion.div>

        {/* Branch Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {branchesOverview.map((branch, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:border-lgreen/40"
              >
                <div>
                  {/* Icon + Branch Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-lgreen transition-colors">
                      {branch.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                    <MapPin className="w-4 h-4" />
                    {branch.location}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    {branch.shortDescription}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={branch.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lgreen hover:text-teal-300 transition-all"
                >
                  Explore our company
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalBranches;