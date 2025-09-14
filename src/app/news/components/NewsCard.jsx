"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NewsCard = ({ item, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        rotateY: 5
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="group relative bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl hover:shadow-emerald-500/25 transition-all duration-500"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Cover Image */}
      {item.image && (
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Floating date badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white"
          >
            {new Date(item.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="text-xl font-bold mb-3 line-clamp-2 leading-tight text-white group-hover:text-emerald-300 transition-colors duration-300"
        >
          {item.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed"
        >
          {item.content}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <Link
            href={`/news/${item._id}`}
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-teal-300 transition-colors group/link"
          >
            <span>Read More</span>
            <motion.svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default NewsCard;