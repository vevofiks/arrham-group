"use client";
import Image from "next/image";
import React , {useState} from "react";
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
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function CompanyDetails({ companyData }) {
  const [ isOpen , setIsOpen ] = useState(false);
  const [selectedProject , setSelectedProject] = useState(null);

  const openModal = ( index ) => {
    setIsOpen(true);
    const project = companyData.projects.find(project => project.id === index)
    console.log(project)
    setSelectedProject(project)
  }

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={companyData.companyImg}
          className="h-full w-full object-cover"
          fill
          alt={companyData.name}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-extrabold text-white"
          >
            Welcome to
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lgreen backdrop-blur-xs px-4 py-2 text-2xl md:text-6xl text-center font-extrabold rounded-lg"
          >
            {companyData.name}
          </motion.h1>
        </div>
      </div>

     

      {/* About Section */}
      <div className="p-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white mb-4 text-2xl"
        >
          <span className="text-white text-4xl font-extrabold uppercase" >

            What 
          </span>
          &nbsp;
          <span className="bg-gradient-to-r from-lgreen via-teal-400 to-cyan-400 text-transparent text-4xl font-extrabold uppercase bg-clip-text">
            we do

          </span>
        </motion.h1>


        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-white text-lg max-w-3xl mx-auto ${montserrat.className} `}
        >
          {companyData.description}

        </motion.p>
      <div className="mt-3" >

        <HoverCard>
          <HoverCardTrigger>
            <Badge className="px-4 py-1 text-sm border-2 border-lgreen text-white font-semibold">
              Our expertise in <ExternalLink className="inline" />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-black/70 text-gray-200">
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
      </div>

      <KeyPersonnel personnels={companyData.keyPersonnel} />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-content-center m-10 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, 
            },
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
            <ProjectCard setIsOpen={setIsOpen} project={project} index={projectIdx} />
       
          </motion.div>

        ))}
      </motion.div>


      <Contact contact={companyData.contact} />


      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default CompanyDetails;
