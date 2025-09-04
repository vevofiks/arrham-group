"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import Image from "next/image";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const enableParallax = true;
  const yBg = useTransform(scrollY, [0, 500], [0, enableParallax ? 150 : 0]);
  const yContent = useTransform(
    scrollY,
    [0, 500],
    [0, enableParallax ? -50 : 0]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center px-6 md:px-24 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: yBg }}
        variants={backgroundVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <Image
          src="/hero2.png"
          alt="Hero background showcasing innovation and technology"
          fill
          priority
          className="object-cover object-center scale-105"
          onLoad={() => setIsLoaded(true)}
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(16,185,129,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)",
              "linear-gradient(225deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(16,185,129,0.1) 100%)",
              "linear-gradient(45deg, rgba(16,185,129,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-white text-4xl md:text-6xl font-extrabold font-sans leading-tight tracking-wide ${montserrat.className}`}
        >
          <span className="block">Building a Smarter Future,</span>
          <span className="block bg-gradient-to-r from-lgreen to-teal-400 text-transparent bg-clip-text">
            Driving Innovation Today
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/90 text-lg md:text-2xl mt-6"
        >
          Engineering, Renewable Energy, and Automotive Solutions with
          Excellence
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16,185,129,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Explore Services - Learn more about our services`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              layoutId="button-bg"
            />
          </motion.a>

          <motion.a
            className="group relative border-2 border-white/80 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white hover:text-black hover:border-white focus:outline-none focus:ring-4 focus:ring-white/50"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Contact Us - Get in touch with us`}
          >
            <span className="flex items-center gap-2">
              Contact Us
              <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
            </span>
          </motion.a>
        </motion.div>
      </div>

      <motion.button
      // function not defineddd..!!
        onClick={(e) => handleScroll("#about", e)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded-full p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll down to learn more"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
