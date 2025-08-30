"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./components/SectionHeader";
import ServiceCategory from "./components/ServiceCategory";
import ProjectHighlights from "./components/ProjectHighlights";
import { servicesData } from "./data";

const ServicesPage = () => {
  return (
    <div className="text-white">
      {/* Page Header */}
      <section className="relative mt-24 pt-16 px-6 md:px-24 text-center">
        <SectionHeader
          title="Our Services"
          subtitle="At Arrham Al Arabia, we deliver innovative, sustainable, and 
          future-ready solutions across engineering, automotive, renewable 
          energy, architectural works, and premium 3M products."
        />
      </section>

      {/* Service Categories */}
      {servicesData.map((service) => (
        <ServiceCategory
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          services={service.services}
        />
      ))}

      {/* Project Highlights */}
      <ProjectHighlights />
    </div>
  );
};

export default ServicesPage;
