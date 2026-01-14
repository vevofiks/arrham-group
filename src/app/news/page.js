"use client";

import React from "react";
import { motion } from "motion/react";
import NewsHero from "./components/NewsHero";
import NewsList from "./components/NewsList";

const NewsPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
    >
      <NewsHero />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-7xl mx-auto px-6 py-20"
      >
        <NewsList />
      </motion.section>
    </motion.main>
  );
};

export default NewsPage;