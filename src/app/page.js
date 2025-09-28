"use client"

import React, { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import ServiceCard from './components/Services'
import { motion } from "motion/react";
import { imageLogos, servicesData } from './data'
import Contact from './components/Contact'
import { ArrowRight } from 'lucide-react'
import LogoLoop from '@/components/LogoLoop'
import Clients from './components/Clients'
import GlobalBranches from './components/GlobalBranches'
import { useRouter } from 'next/navigation'
// import Map from './components/Map'
import { branchesData } from '.'
import SimpleCard from './about-us/components/Companies'

const Page = () => {
  const router = useRouter();
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

  const getToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

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
  return (
    <div id="home" className="relative">
      

      <section className="flex items-center justify-center mt-12 px-5 sm:px-10 md:px-20 h-[93vh]">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {branchesData.branches.map((branch) => (
            <SimpleCard key={branch.id} branch={branch} />
          ))}
        </motion.div>
      </section>

      {/* Hero Section */}
      <div className="mt-16">
        <Hero getToSection={getToSection} />
      </div>

      {/* Bottom Blur / Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-3xl bg-gradient-to-b from-transparent to-black" />

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
            className="w-24 h-1.5 bg-gradient-to-r from-lgreen to-teal-400 mx-auto mt-6 rounded-full"
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
      <Clients />
      <Contact />
    </div>
  );
}


export default Page