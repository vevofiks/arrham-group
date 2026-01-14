'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Wrench, Car } from "lucide-react";
import { useState } from 'react';


export default function AboutUs() {
  const CompanyName = "Arrham Group";
  const [hoveredCard, setHoveredCard] = useState(null);
  const cards = [
    {
      title: "Engineering & Construction",
      text: "Innovative solutions for modern infrastructure",
      color: "emerald",
      icon: <Wrench className="text-emerald-400 inline" size={28} />
    },
    {
      title: "Automotive Services",
      text: "Comprehensive automotive care and solutions",
      color: "emerald",
      icon: <Car className="inline text-emerald-400 " size={28} />
    }
  ];
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 p-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/hero2.png"
                alt="About us - Arrham Group"
                className="w-full h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                width={600} height={400}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-teal-500/20 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          <div className="space-y-8 lg:mt-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl tracking-tight font-semibold text-white">
                <motion.span
                  className="text-white bg-clip-text block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  About Us
                </motion.span>

              </h3>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-5xl font-extrabold tracking-tight">
                <motion.span
                  className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 decoration-emerald-400 text-transparent bg-clip-text block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {CompanyName}
                </motion.span>
                <motion.div
                  className="w-24 h-1.5 bg-linear-to-r from-lgreen to-teal-400 mt-6 rounded-full"
                />
              </h2>
            </motion.div>




            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p
                className="text-xl text-white/90 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                {CompanyName} is a dynamic and innovative leader in two major industries:
                <span className="text-lgreen font-semibold bg-lgreen/10 px-1 py-1 rounded"> Engineering & Construction</span> and
                <span className="text-lgreen font-semibold bg-lgreen/10 px-1 py-1 rounded"> Automotive Services</span>.
              </motion.p>

              <motion.p
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                We are specialized in <span className="text-lgreen">engineering</span>, <span className="text-emerald-300">renewable energy</span>,
                <span className="text-teal-300"> interior design</span>, and <span className="text-lgreen">automotive services</span>.
                We are committed to delivering exceptional quality and innovative results. Our approach is centered around meeting
                the unique and evolving needs of our clients across a wide range of industries.
              </motion.p>

              <motion.p
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
              >
                At {CompanyName}, we combine advanced technology, expertise,
                and an unwavering focus on customer satisfaction to deliver outstanding outcomes across all of our service areas.
                We pride ourselves on offering comprehensive, reliable, and cost-effective solutions for every project.
              </motion.p>
            </motion.div>



            <motion.div
              className="grid grid-cols-2 gap-4 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  transition={{ duration: 0.3 }}
                  className={`p-4 sm:p-6 md:p-3 rounded-2xl transition-all duration-300 cursor-pointer 
                  ${hoveredCard === index
                      ? "bg-lgreen/10 border border-lgreen/30"
                      : "bg-white/5 border border-white/10"
                    }`}
                >
                  <h3 className={`text-${card.color}-400 font-semibold text-lg mb-2`}>
                    <span className="inline-flex items-center">
                      {card.title}
                    </span>
                    <button
                      className="px-2 inline py-1 text-xs sm:text-sm text-lgreen-400 rounded-lg transition"

                    >
                      {card.icon}


                    </button>
                  </h3>

                  <p className="text-white/70 text-sm">{card.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};