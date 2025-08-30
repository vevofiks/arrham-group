"use client"

import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import ServiceCard from './components/Services'
import { motion } from "motion/react";
import { servicesData } from './data'
import Contact from './components/Contact'
import { ArrowRight } from 'lucide-react'

const Page = () => {

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale : 1 },
    visible: {
      opacity: 1,
      scale : 1.4,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <div id="home">
      <Hero />
      <About />
      <div
        id="services"
        className="relative bg-black text-white py-20 px-6 md:px-24"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Our <span className="text-lgreen">Services</span>
          </h2>
          <div className="w-24 h-1 bg-lgreen mx-auto my-6"></div>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We provide a wide range of innovative solutions designed to help your
            business grow and adapt in a rapidly evolving digital world.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <motion.div variants={itemVariants}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="group mt-24 inline-flex items-center gap-3 bg-gradient-to-r from-lgreen to-teal-500 text-black px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-lgreen/25 focus:outline-none"
            >
              <span>Learn more about our services</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>

      </div>
      <Contact />
    </div>
  )
}

export default Page
