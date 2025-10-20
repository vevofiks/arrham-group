"use client";
import React, { useEffect, useState } from 'react';
import { Hospital, Wrench, Sprout, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from "motion/react";
import { Montserrat as MontserratFont } from "next/font/google";
import { useParams } from 'next/navigation';
import ProjectCard from '../components/ProjectsCard';
import { branchesData } from '@/app';
import Modal from '../components/modal';
import Partners from '../components/Partners';
import RollingGallery from '@/components/RollingGallery';
import Certificates from '../components/Certificates';
import Clients from '@/app/components/Clients';

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function ArrhamHealthcare() {

  const {slug} = useParams();
  const companyData = branchesData.branches.find((branch) => branch.id == slug);
  const companyName = "Arrham Healthcare Solutions";
  const subName = "Kingdom of Bahrain";
  const [projects , setProjects] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject , setSelectedProject] = useState();
  const [partnerships, setPartnerships] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clients, setClients] = useState([]);

  const samplePartnerships = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop",
      website: "https://techcorp.example.com"
    },
    {
      id: 2,
      name: "Digital Innovations",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop",
      website: "https://digitalinnovations.example.com"
    },
  ];

  async function getPartnerships() {
    try {
        const res = await fetch(`/api/partners?branchId=${companyData.id}`);
      if (!res.ok) throw new Error(`Failed to fetch partnerships: ${res.status}`);
      const data = await res.json();
      setPartnerships(Array.isArray(data) && data.length ? data : samplePartnerships);
    } catch (error) {
      console.error('Error fetching partnerships, falling back to sample:', error);
      setPartnerships(samplePartnerships);
    }
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  // Fetch certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`/api/certifications?branchId=${companyData.id}`);
        const data = await response.json();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setCertificates([]);
      }
    };

    if (companyData.id) {
      fetchCertificates();
    }
  }, [companyData.id]);

  // Fetch brands data
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/api/brands?branchId=${companyData.id}`);
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    if (companyData.id) {
      fetchBrands();
    }
  }, [companyData.id]);

  // Fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients?branchId=${companyData.id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const images = data.flatMap(item => Array.isArray(item.images) ? item.images : []);
          setClients(images);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    if (companyData.id) {
      fetchClients();
    }
  }, [companyData.id]);
  const openModal = (projectDetails) => {
    setIsOpen(true);
    console.log('project',projectDetails)
    setSelectedProject(projectDetails);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?branchId=${slug}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (slug) {
      fetchProjects();
    }
  },[])

  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <Image
          src="/companyDummy.png"
          className="h-full w-full object-cover"
          fill
          alt="arrham health care solutions"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 bg-black/60 backdrop-blur-sm">
          {/* Left Content */}
          <div className="">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-xl md:text-2xl lg:text-3xl font-bold text-left text-gray-100 ${montserrat.className}`}
            >
              Welcome to
            </motion.h1>

            {/* Main Company Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold leading-snug text-nowrap ${montserrat.className}`}
            >
              {companyName}
            </motion.h1>

            {/* Sub Name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className={`text-lg md:text-xl lg:text-2xl font-medium text-left text-gray-200 leading-relaxed ${montserrat.className}`}
            >
              {subName}
            </motion.h2>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase mb-6 ${montserrat.className}`}
          >
            <span className="text-white">Who </span>
            <span className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
              We Are
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className={`text-lg md:text-xl leading-relaxed text-gray-300 text-left ${montserrat.className}`}>
              Arrham Trading and Contracting W.L.L. is a dynamic and multifaceted firm
              specializing in high-quality construction, fit-out, and contracting services across the
              Commercial, Residential, and Industrial sectors. With a solid foundation built on
              integrity, innovation, and professionalism, Arrham has earned a reputation for
              delivering projects that align with international standards and exceed client
              expectations.
              Hidaya Healthcare W.L.L. is a specialized entity under the Arrham Group, solely
              focused on the design, construction, and turnkey development of healthcare
              environments. With an in-depth understanding of medical compliance, hygiene
              protocols, and patient-centric design, Hidaya stands at the forefront of healthcare
              infrastructure development in Bahrain and the region.
              From large-scale hospitals to niche diagnostic clinics, Hidaya brings together a
              multidisciplinary team of architects, engineers, healthcare planners, and project
              managers to deliver environments that are efficient, safe, adaptable, and compliant
              with global healthcare standards.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
          {[
            {
              icon: Hospital,
              title: "Healthcare Excellence",
              description: "Specialized in designing and constructing state-of-the-art medical facilities with global compliance standards.",
              color: "teal",
              gradient: "from-teal-400 to-blue-500",
              borderColor: "teal-400/20",
              hoverBorder: "teal-400/50",
              textColor: "teal-300"
            },
            {
              icon: Wrench,
              title: "Turnkey Solutions",
              description: "Complete project execution from concept to handover, ensuring seamless integration and superior quality.",
              color: "blue",
              gradient: "from-blue-400 to-teal-500",
              borderColor: "blue-400/20",
              hoverBorder: "blue-400/50",
              textColor: "blue-300"
            },
            {
              icon: Sprout,
              title: "Sustainable Design",
              description: "Environmental consciousness integrated into every project with energy-efficient and eco-friendly solutions.",
              color: "teal",
              gradient: "from-teal-500 to-blue-400",
              borderColor: "teal-400/20",
              hoverBorder: "teal-400/50",
              textColor: "teal-300"
            }

          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-${service.borderColor} hover:border-${service.hoverBorder} transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <service.icon size={35} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-${service.textColor} ${montserrat.className}`}>
                {service.title}
              </h3>
              <p className={`text-gray-300 leading-relaxed ${montserrat.className}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Key Personnel Section */}
      <section className="px-6 md:px-12 lg:px-16 py-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${montserrat.className}`}
            >
              <span className="text-white">Key </span>
              <span className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
                Personnel
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-teal-400/30 max-w-md hover:border-teal-400/50 transition-colors duration-300 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto text-4xl font-bold shadow-lg">
                F
              </div>
              <h3 className={`text-3xl font-bold mb-2 text-teal-300 ${montserrat.className}`}>
                Faisal Al Mansoor
              </h3>
              <p className={`text-xl text-blue-300 mb-4 ${montserrat.className}`}>
                Country Operations Head - Bahrain
              </p>
              <p className={`text-gray-300 ${montserrat.className}`}>
                12+ years in fit-out and retail verticals
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      {/* <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center ${montserrat.className}`}
        >
          <span className="text-white">Who </span>
          <span className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            We Are
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className={`text-lg md:text-xl text-gray-300 leading-relaxed ${montserrat.className}`}>
              <span className="text-teal-400 font-semibold">Arrham Healthcare Solutions (Hidaya Healthcare Solutions W.L.L.)
                Bahrain</span> is a dynamic and multifaceted firm specializing in high-quality construction, fit-out, and contracting services across Commercial, Residential, and Industrial sectors. Built on integrity, innovation, and professionalism.
            </p>

            <p className={`text-lg md:text-xl text-gray-300 leading-relaxed ${montserrat.className}`}>
              <span className="text-blue-400 font-semibold">Hidaya Healthcare W.L.L.</span> is our specialized entity focused exclusively on healthcare infrastructure development, bringing together multidisciplinary expertise in medical compliance, hygiene protocols, and patient-centric design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-teal-400/20 hover:border-teal-400/30 transition-colors duration-300 shadow-lg"
          >
            <h3 className={`text-2xl md:text-3xl font-bold mb-6 text-teal-300 ${montserrat.className}`}>
              Our Healthcare Expertise
            </h3>
            <ul className="space-y-4 text-gray-300">
              {[
                {
                  title: "Hospitals & Medical Centers:",
                  description: "Full-scale in-patient and out-patient facilities, operating theatres, ICUs, labs, and imaging suites.",
                  color: "teal-400"
                },
                {
                  title: "Clinics & Day Surgery Centers:",
                  description: "Functional layouts with medical gas systems and infection control zones.",
                  color: "blue-400"
                },
                {
                  title: "Diagnostic & Imaging Facilities:",
                  description: "MRI, CT, X-Ray units with specialized radiation shielding.",
                  color: "teal-400"
                },
                {
                  title: "Wellness & Rehabilitation:",
                  description: "Healing environments with hydrotherapy, physio, and wellness zones.",
                  color: "blue-400"
                }
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className={`w-2 h-2 bg-${item.color} rounded-full mt-3 flex-shrink-0`} />
                  <span className={montserrat.className}>
                    <strong className="text-white">{item.title}</strong> {item.description}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section> */}

      {/* Mission, Vision, Values */}
      <section className="px-6 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-gray-800/50 to-teal-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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
            {[
              {
                title: "Mission",
                content: "To address unique demands with precision and accountability across various sectors while upholding stringent Healthcare infrastructure standards by aligning international compliances to ensure durability, safety, and long-term value.",
                color: "teal-400",
                borderColor: "teal-400/20"
              },
              {
                title: "Vision",
                content: "Envision a future where design, construction, and healthcare environments converge to uplift communities. Through innovation and specialized partnerships, we aim to be the partner of choice for quality, compliance, and long-term performance.",
                color: "blue-400",
                borderColor: "blue-400/20"
              },
              {
                title: "Values",
                content: "Driven by clinical precision, patient-centered engineering, and uncompromising safety. We uphold strict regulatory compliance, embrace purposeful innovation, and foster trusted partnerships for resilient healthcare infrastructure.",
                color: "teal-400",
                borderColor: "teal-400/20"
              },
              {
                title: "Sustainability",
                content: "Engineering healthcare environments that minimize environmental impact while maximizing human well-being through energy-efficient systems and smart automation.",
                color: "blue-400",
                borderColor: "blue-400/20",
                tags: ["Renewable Energy", "Water Efficiency", "Low Emissions"]
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className={`bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-${item.borderColor} hover:border-${item.color}/30 transition-colors duration-300 shadow-lg`}
              >
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-${item.color} ${montserrat.className}`}>
                  {item.title}
                </h2>
                <p className={`text-lg text-gray-300 leading-relaxed mb-4 ${montserrat.className}`}>
                  {item.content}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`px-3 py-1 rounded-full text-sm ${tagIdx % 2 === 0
                          ? "bg-teal-400/20 text-teal-300"
                          : "bg-blue-400/20 text-blue-300"
                          } ${montserrat.className}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
            {
              partnerships.length > 0 && (


                <Partners partnerships={partnerships} lColor={"emerald-400"} rColor={"blue-400"} />
              )
            }

            {/* Certificates Section */}
            {certificates && certificates.length > 0 && (
              <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
                <Certificates certificates={certificates} lColor="#34d399" rColor="#60a5fa" />              
              </section>
            )}

        {projects && projects.length > 0 && (
          <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`mb-12 text-center text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase ${montserrat.className}`}

            >
              <span className={`bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent`}>
                Our Projects
              </span>

            </motion.h2>
            
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
  
                {projects?.map((project, projectIdx) => (
                  <motion.div
                    key={projectIdx}
                    onClick={() => openModal( project)}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="cursor-pointer"
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

        {/* Brands Section */}
        {brands.length > 0 && (
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Our Brands
              </h2>

              <div className="w-24 h-1 bg-emerald-400 mx-auto mt-6 rounded-full shadow-lg shadow-emerald-500/50"></div>
            </div>

            {/* Brand Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {brands.map((brand) => (
                <a
                  key={brand._id}
                  href={toExternalUrl(brand.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2"
                >
                  {/* Logo Container */}
                  <div className="aspect-square w-full mb-4 rounded-xl bg-white p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.img}
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain transition-transform duration-300"
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-white font-semibold text-center text-lg mb-2 capitalize">
                    {brand.name}
                  </h3>

                  {/* Visit Link Indicator */}
                  <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Visit Site</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-emerald-600/0 group-hover:from-emerald-400/10 group-hover:to-emerald-600/10 transition-all duration-300 pointer-events-none"></div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Clients Section */}
        {clients.length > 0 && (
          <Clients imageLogos={clients} lColor="#34d399" rColor="#60a5fa" />)}
      </section>

      {/* <section className="px-6 md:px-12 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase ${montserrat.className}`}>
            <span className={`bg-gradient-to-r from-emerald-400 ${companyData.color?.[1] || 'to-blue-600'} bg-clip-text text-transparent`}>
              Our Works
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RollingGallery autoplay={true} pauseOnHover={true} companyId={companyData?.id} />
        </motion.div>
      </section> */}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default ArrhamHealthcare;