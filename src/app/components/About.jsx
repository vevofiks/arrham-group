"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { stats } from "../data";

const AnimatedCounter = React.memo(
  ({ value, suffix = "", prifix = "", shouldAnimate }) => {
    const count = useMotionValue(0);
    const springValue = useSpring(count, { stiffness: 100, damping: 30 });
    const rounded = useTransform(springValue, (latest) => Math.floor(latest));
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (shouldAnimate && !hasAnimated) {
        count.set(value);
        setHasAnimated(true);
      }
    }, [shouldAnimate, value, count, hasAnimated]);

    return (
      <span className="text-3xl sm:text-4xl font-bold text-lgreen">
        {prifix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    );
  }
);

AnimatedCounter.displayName = "AnimatedCounter";

const About = ({
  image = "/hero2.png",
  companyName = "Arrham Group",
  title = "About",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-50px",
    amount: 0.3,
  });

  useEffect(() => {
    if (statsInView && !shouldAnimateStats) {
      const timer = setTimeout(() => {
        setShouldAnimateStats(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [statsInView, shouldAnimateStats]);

  const handleStatHoverStart = useCallback((index) => {
    setHoveredStat(index);
  }, []);

  const handleStatHoverEnd = useCallback(() => {
    setHoveredStat(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const keyFeatures = [
    "Engineering Excellence & Innovation",
    "Renewable Energy Solutions",
    "Advanced Automotive Services",
    "Customer-Centric Approach",
    "Sustainable & Eco-Friendly Practices",
    "24/7 Professional Support",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative text-white py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-lgreen/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative group"
          >
            <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={`About ${companyName} - Innovation and Excellence`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60" />

              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.8 }}
                className="absolute inset-0 m-auto w-16 h-16 bg-lgreen rounded-full flex items-center justify-center text-black hover:bg-lgreen transition-colors duration-300 shadow-xl opacity-0 group-hover:opacity-100"
              >
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </motion.button>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-lgreen/20 to-teal-500/20 rounded-3xl -z-10 opacity-50 blur-xl" />
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-white">{title} </span>
                <span className="bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                  Us
                </span>
              </h2>

              <motion.div
                variants={itemVariants}
                className="w-24 h-1.5 bg-gradient-to-r from-lgreen to-teal-400 mt-6 rounded-full"
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                {companyName} is a dynamic and innovative leader in two major
                industries:{" "}
                <span className="text-lgreen font-semibold bg-lgreen/10 px-2 py-1 rounded">
                  Engineering & Construction
                </span>{" "}
                and{" "}
                <span className="text-lgreen font-semibold bg-lgreen/10 px-2 py-1 rounded">
                  Automotive Services
                </span>
                . We specialize in engineering, renewable energy, interior
                design, and automotive services, all committed to delivering
                exceptional quality and innovative results.
              </p>

              <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
                At {companyName}, we combine advanced technology, deep
                expertise, and an unwavering focus on{" "}
                <span className="text-lgreen font-semibold">
                  customer satisfaction
                </span>{" "}
                to deliver outstanding outcomes. We pride ourselves on providing
                comprehensive, reliable, and cost-effective solutions for every
                project.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-lgreen mb-4">
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-lgreen flex-shrink-0" />
                    <span className="text-sm lg:text-base">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-lgreen to-teal-500 text-black px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-lgreen/25 focus:outline-none"
              >
                <span>Learn More About Our Services</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  onHoverStart={() => handleStatHoverStart(index)}
                  onHoverEnd={handleStatHoverEnd}
                  className={`text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    hoveredStat === index
                      ? "bg-lgreen/10 border border-lgreen/30"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <motion.div className="inline-flex items-center justify-center w-12 h-12 bg-lgreen/20 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-lgreen" />
                  </motion.div>

                  <div className="mb-2">
                    <AnimatedCounter
                      value={stat.number}
                      suffix={stat.suffix}
                      prifix={stat.prifix}
                      shouldAnimate={shouldAnimateStats}
                    />
                  </div>

                  <p className="text-white/70 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
