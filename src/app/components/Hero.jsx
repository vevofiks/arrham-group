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

const Hero = ({ getToSection }) => {
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
      className="relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-24 overflow-hidden"
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
          sizes="(max-width: 768px) 100vw, 100vw"
        />

        <div className="absolute inset-0 bg-linear-to-b -mt-24 from-black/50 via-black/60 to-black/70" />
        <div className="absolute inset-x-0 bottom-0 h-60 -mt-24 bg-linear-to-b from-transparent to-black/90 blur-2xl" />
        <motion.div
          className="absolute inset-0 -mt-5 bg-linear-to-r from-emerald-500/10 via-transparent to-teal-500/10"
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

      <div className="relative z-10 pt-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-white font-extrabold leading-tight tracking-wide text-center overflow-visible ${montserrat.className} text-[clamp(1rem,5vw,2.8rem)]`}
        >
          <span className="inline-block whitespace-nowrap md:whitespace-nowrap sm:whitespace-normal">
            Shaping Tomorrow with{" "}
          </span>
          <span className="inline-block bg-linear-to-r from-lgreen to-teal-400 text-transparent bg-clip-text whitespace-nowrap md:whitespace-nowrap sm:whitespace-normal pl-3">
            Engineered Solutions
          </span>
        </motion.h1>




        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/90 text-sm sm:text-md md:text-lg mt-4 sm:mt-6 max-w-4xl text-center mx-auto"
        >
          At Arrham Group, we deliver high-quality, future-ready solutions in
          <span className="font-bold bg-linear-to-r from-lgreen to-teal-400 text-transparent bg-clip-text">
            {" "}
            Automotive Film, Electrical, Turnkey  Services,
            <span className="whitespace-nowrap">Fit-Out</span>, Healthcare and Mechanical
            Services,{" "}
          </span>
          serving both businesses and individuals across Bahrain, Saudi Arabia, Canada and beyond.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
