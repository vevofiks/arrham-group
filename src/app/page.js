"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('./components/Hero'), { ssr: false })
const About = dynamic(() => import('./components/About'), { ssr: false })
import ServiceCard from './components/Services'
import { motion } from "motion/react";
import Contact from './components/Contact'
import { ArrowRight, ChevronDown } from 'lucide-react'
import LogoLoop from '@/components/LogoLoop'
import Clients from './components/Clients'
import { useRouter } from 'next/navigation'
import { branchesData } from '.'
import SimpleCard from './about-us/components/Companies'

const Page = () => {
  const router = useRouter();
  const [imageLogosData, setImageLogosData] = useState(null);
  useEffect(() => {
    const target = sessionStorage.getItem("scroll-target");
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 300)
      }
      sessionStorage.removeItem("scroll-target");
    }
  }, [])

  const handleScroll = (item) => {
    const element = document.querySelector(item);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const fetchClientImages = async () => {
      try {
        const response = await fetch('/api/clients/images');
        const data = await response.json();
        setImageLogosData(data);
      } catch (error) {
        console.error('Error fetching client images:', error);
      }
    };

    fetchClientImages();
  }, []);

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

  console.log("Image Logos Data:", imageLogosData);

  return (
    <div id="home" className="relative">
      <section className="relative flex flex-col items-center justify-center mt-26 md:mt-12 px-5 sm:px-10 md:px-20 min-h-screen">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-content-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {branchesData.branches.map((branch) => (
            <SimpleCard key={branch.id} branch={branch} />
          ))}
        </motion.div>

        {/* Scroll button */}
        <motion.button
          onClick={(e) => handleScroll("#hero", e)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 z-50 text-white/70 hover:text-emerald-400 transition-colors duration-300 focus:outline-none rounded-full p-2"
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
            className="flex flex-col items-center gap-1 focus:outline-none"
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              Scroll
            </span>
            <ChevronDown className="w-6 h-6 focus:outline-none" />
          </motion.div>
        </motion.button>
      </section>

      {/* Hero Section */}
      <div className="hero">
        <Hero getToSection={getToSection} />
      </div>

      {/* Bottom Blur / linear */}
      <div className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-3xl bg-linear-to-b from-transparent to-black" />

      {/* About Section */}
      <div className="mt-32">
        <About />
      </div>

      {/* Global Presence */}
      {/* <div className="mt-32 text-center">
        <motion.div
          id="company"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase text-white"
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
      </div> */}

      {/* Clients & Contact */}
      <Clients imageLogos={imageLogosData} />
      <Contact />
    </div>
  );
}


export default Page