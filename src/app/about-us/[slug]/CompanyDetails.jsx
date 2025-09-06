"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectsCard";
import Modal from "../components/modal";
import { Montserrat as MontserratFont } from "next/font/google";
import Contact from "../components/Contact";
import KeyPersonnel from "../components/KeyPersonal";
import { ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

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
            className="bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400 bg-clip-text text-transparent px-4 py-2 text-3xl md:text-6xl text-center font-extrabold"
          >
            {companyData.name}
          </motion.h1>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-3xl md:text-4xl font-extrabold uppercase"
        >
          <span className="text-white">What </span>
          <span className="bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            We Do
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mx-auto max-w-3xl text-lg leading-relaxed opacity-90 ${montserrat.className}`}
        >
          {companyData.description}
        </motion.p>

        {/* Expertise HoverCard */}
        <div className="mt-6 flex justify-center">
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="px-5 py-2 text-sm border-2 border-lgreen text-white font-semibold hover:bg-lgreen/10">
                Our Expertise <ExternalLink className="ml-2 inline h-4 w-4" />
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-gray-900/90 text-gray-200 border border-lgreen/30">
              <p>{companyData.otherDetails?.expertise}</p>
              {companyData.contact && (
                <a
                  href={companyData.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center mt-3 text-teal-400 underline hover:text-cyan-300"
                >
                  Visit Site →
                </a>
              )}
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>

      {/* Key Personnel */}
      <section className="px-6 py-12">
        <KeyPersonnel personnels={companyData.keyPersonnel} />
      </section>

      {/* Projects */}
      <section className="px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-3xl md:text-4xl font-extrabold uppercase"
        >
          <span className="bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400 bg-clip-text text-transparent">
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
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16">
        <Contact contact={companyData.contact} />
      </section>

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
