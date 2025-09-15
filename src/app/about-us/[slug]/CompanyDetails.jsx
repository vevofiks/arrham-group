"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectsCard";
import Modal from "../components/modal";
import { Montserrat as MontserratFont } from "next/font/google";
import KeyPersonnel from "../components/KeyPersonal";
import { CircleCheckBig } from "lucide-react";
import RollingGallery from "@/components/RollingGallery";
const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function CompanyDetails({ companyData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (index) => {
    setIsOpen(true);
    const project = companyData.projects.find((p) => p.id === index);
    setSelectedProject(project);
  };

  const location = companyData.map;

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <Image
          src={companyData.companyImg}
          className="h-full w-full object-cover"
          fill
          alt={companyData.name}
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-sm">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Welcome to
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`bg-gradient-to-r ${companyData.color[0]} ${companyData.color[1]} bg-clip-text text-transparent px-4 py-2 text-3xl md:text-6xl text-center font-extrabold`}
          >
            {companyData.name}
          </motion.h1>
        </div>
      </div>

      {/* What We Do */}
      <section className="px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-3xl md:text-4xl font-extrabold uppercase"
        >
          <span className="text-white">What </span>
          <span
            className={`bg-gradient-to-r ${companyData.color[0]} ${companyData.color[1]} bg-clip-text text-transparent`}
          >
            We Do
          </span> 
        </motion.h2>
         <div className="w-24 h-1 bg-lgreen my-6 mb-12 mx-auto"></div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mx-auto max-w-3xl text-lg leading-relaxed opacity-90 ${montserrat.className}`}
        >
          {companyData.description}
        </motion.p>
      </section>

      {/* primay company data  */}


      { companyData.id === "arrham-trading-bahrain" && (

          <div className="max-w-4xl mx-auto px-6 py-12 text-center">


          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Our Services
            </h2>
            <ul className="space-y-3">
              {companyData.services.map((service, idx) => (
                <li
                  key={idx}
                  className="bg-gray-900/40 border border-gray-700 p-4 rounded-lg text-gray-200 shadow-md"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}

        
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Industries We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {companyData.industries.map((industry, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Key Advantages

            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 text-left max-w-2xl mx-auto">
              {companyData.keyAdvantages.map((advantage, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-gray-200"
                >
                  <span className="text-emerald-400 text-xl">✔</span>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        
        </div>
        )
      }

      

      {/* 3M Section */}
      {companyData.threeM && (
        <section className="px-6 py-16">


          <Image
            src={companyData.threeM.logo}
            alt="3M Logo"
            width={320}
            height={320}
            className="mx-auto mb-4"
          />

          <p className="max-w-3xl mx-auto mb-6 opacity-90">
            {companyData.threeM.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-24 text-center">
            {companyData.threeM.services.map((service, idx) => (

              <div
                key={idx}
                className="p-4 border border-gray-700 rounded-lg bg-gray-900/40"
              >
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>

                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {service.description.map((point, pIdx) => (
                    <p key={pIdx}>{point}</p>
                  ))}
                </ul>
              </div>
            ))}
          </div>

         {/* Why Choose Us Section */}

        <div className="mt-8 p-6 rounded-xl text-center">

          <h2 className="text-4xl font-bold  text-teal-400 mb-4">
            Why Choose Us
          </h2>
          <div className="flex justify-center">
            <ul className="text-left space-y-2 text-gray-300">
              {companyData.threeM.keyAdvantages.map((advantage, idx) => (
                <li key={idx} className="leading-relaxed">
                  <CircleCheckBig className="inline mr-2"/>{advantage}
                </li>
              ))}
            </ul>
          </div>

        </div>

        </section>
      )}

      {/* Electrical & MEP Section */}
      {companyData?.electricalMEP && (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-emerald-400 mb-4">
            {companyData.electricalMEP.name}
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            {companyData.electricalMEP.description}
          </p>

          {/* Services */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {companyData.electricalMEP.services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-900/40 border border-gray-700 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-emerald-300 mb-4">
                  {service.title}
                </h3>
                <ul className="list-disc list-inside text-gray-200 space-y-2 text-left">
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Industries */}
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">
            Industries & Sectors We Serve
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 mb-12 max-w-2xl mx-auto">
            {companyData.electricalMEP.industries.map((industry, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-900/40 border border-gray-700 rounded-lg text-gray-200"
              >
                {industry}
              </li>
            ))}
          </ul>

          {/* Strengths */}
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">
            Our Strengths
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {companyData.electricalMEP.keyAdvantages.map((adv, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-gray-200"
              >
                <span className="text-emerald-400 text-xl">⚡</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Key Personnel */}
      {companyData.keyPersonnel && (
        <section className="flex items-center justify-center mt-5">
          <KeyPersonnel
            personnels={companyData.keyPersonnel}
            color={companyData.color}
            primaryColor={companyData.primaryColor}
          />
        </section>
      )}

      {/* Projects */}
      {companyData.projects && companyData.projects.length > 0 && (
        <section className="px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center text-3xl md:text-4xl font-extrabold uppercase"
          >
            <span
              className={`bg-gradient-to-r ${companyData.color[0]} ${companyData.color[1]} bg-clip-text text-transparent`}
            >
              Our Projects
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {companyData.projects.map((project, projectIdx) => (
              <motion.div
                key={projectIdx}
                onClick={() => openModal(projectIdx + 1)}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <ProjectCard
                  setIsOpen={setIsOpen}
                  project={project}
                  index={projectIdx}
                  company={companyData}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}


      {/* latest projects */}
      <div className="flex justify-center" >
         <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold uppercase"
        >

          <span className="text-white">Our </span>
          <span
            className={`bg-gradient-to-r ${companyData.color[0]} ${companyData.color[1]} bg-clip-text text-transparent`}
          >
            Works
          </span> 
        </motion.h2>



      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default CompanyDetails;
