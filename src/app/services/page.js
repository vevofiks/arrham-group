"use client";
import React, { useEffect } from "react";
import ServiceCategory from "./components/ServiceCategory";
import ProjectHighlights from "./components/ProjectHighlights";
import { servicesData } from "./data";
import { motion } from "motion/react";
import Image from "next/image";
import SectionHeader from "./components/SectionHeader";

const Page = () => {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      sessionStorage.removeItem("scrollTarget");
    }
  }, []);

  const subtitle = `At Arrham Al Arabia, we deliver innovative, sustainable, and 
          future-ready solutions across engineering, automotive, renewable 
          energy, architectural works, and premium 3M products.`

  return (
    <div className="text-white relative">



      <section className="relative text-center pt-[14rem] px-6 md:px-24  h-screen">
        <SectionHeader
          title="Our Services"
          subtitle={subtitle}
        />
      </section>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut", duration: 1 }}
      >
        {["Arrham Trading & Contracting", "Arrham Contracting Company", "Arrham Group", "Arrham Health Care Solutions"].map((company) => (
          <div key={company} className="relative">
            <SectionHeader
              title={company}
              subtitle={`Services offered by ${company}`}
            />
            {servicesData
              .filter((s) => s.company === company)
              .map((service, i) => (
                <ServiceCategory key={service.id} {...service} reverse={i % 2 === 1} />
              ))}
          </div>
        ))}
      </motion.div>

      {/* Highlights */}
      <ProjectHighlights />
    </div>
  );
};

export default Page;
