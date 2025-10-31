"use client";
import React, { useEffect, useState } from "react";
import { Hospital, Wrench, Sprout, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Montserrat as MontserratFont } from "next/font/google";
import { useParams } from "next/navigation";
import ProjectCard from "../components/ProjectsCard";
import { branchesData } from "@/app";
import Modal from "../components/modal";
import Partners from "../components/Partners";
import RollingGallery from "@/components/RollingGallery";
import Certificates from "../components/Certificates";
import Clients from "@/app/components/Clients";
import KeyPersonnel from "../components/KeyPersonnel";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function ArrhamHealthcare() {
  const { slug } = useParams();
  const companyData = branchesData.branches.find((branch) => branch.id == slug);
  const companyName = "Arrham Healthcare Solutions";
  const subName = "Kingdom of Bahrain";
  const [projects, setProjects] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [partnerships, setPartnerships] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clients, setClients] = useState([]);
  const [keyPersonnel, setKeyPersonnel] = useState([]);

  async function getPartnerships() {
    try {
      const res = await fetch(`/api/partners?branchId=${companyData.id}`);
      if (!res.ok)
        throw new Error(`Failed to fetch partnerships: ${res.status}`);
      const data = await res.json();
      console.log("Fetched partnerships:", data);
      setPartnerships(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Error fetching partnerships, falling back to sample:",
        error
      );
    }
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  // Fetch key personnel for Arrham Healthcare
  useEffect(() => {
    const fetchKeyPersonnel = async () => {
      try {
        const res = await fetch(
          `/api/key-personnel?branchId=${companyData.id}`
        );
        const data = await res.json();
        setKeyPersonnel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching key personnel:", error);
        setKeyPersonnel([]);
      }
    };

    if (companyData?.id) {
      fetchKeyPersonnel();
    }
  }, [companyData?.id]);

  // Fetch certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
          `/api/certifications?branchId=${companyData.id}`
        );
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
          const images = data.flatMap((item) =>
            Array.isArray(item.images) ? item.images : []
          );
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
    console.log("project", projectDetails);
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
  }, []);

  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
      return trimmed;
    return `https://${trimmed}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 overflow-hidden">
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
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          {/* Left Content */}
          <div className="">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-xl md:text-2xl lg:text-3xl font-bold text-left text-white ${montserrat.className}`}
            >
              Welcome to
            </motion.h1>

            {/* Main Company Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold leading-snug text-nowrap ${montserrat.className}`}
            >
              {companyName}
            </motion.h1>

            {/* Sub Name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 text-white ${montserrat.className}`}
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
            className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 ${montserrat.className}`}
          >
            <span className="bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Who We Are
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-teal-400 mx-auto rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p
            className={`text-lg md:text-xl leading-relaxed text-gray-700 text-left ${montserrat.className}`}
          >
            Arrham Healthcare Solutions, Kingdom of Bahrain is a specialized
            entity under the Arrham Group, solely focused on the design,
            construction, and turnkey development of healthcare environments.
            With an in-depth understanding of medical compliance, hygiene
            protocols, and patient-centric design, Arrham Healthcare Solutions
            stands at the forefront of healthcare infrastructure development in
            Bahrain and the region. From large-scale hospitals to niche
            diagnostic clinics, Arrham Healthcare Solutions brings together a
            multidisciplinary team of architects, engineers, healthcare
            planners, and project managers to deliver environments that are
            efficient, safe, adaptable, and compliant with global healthcare
            standards.
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
              description:
                "Specialized in designing and constructing state-of-the-art medical facilities with global compliance standards.",
              color: "teal",
              gradient: "from-teal-400 to-blue-500",
              borderColor: "teal-400/20",
              hoverBorder: "teal-400/50",
              textColor: "teal-300",
            },
            {
              icon: Wrench,
              title: "Turnkey Solutions",
              description:
                "Complete project execution from concept to handover, ensuring seamless integration and superior quality.",
              color: "blue",
              gradient: "from-blue-400 to-teal-500",
              borderColor: "blue-400/20",
              hoverBorder: "blue-400/50",
              textColor: "blue-300",
            },
            {
              icon: Sprout,
              title: "Sustainable Design",
              description:
                "Environmental consciousness integrated into every project with energy-efficient and eco-friendly solutions.",
              color: "teal",
              gradient: "from-teal-500 to-blue-400",
              borderColor: "teal-400/20",
              hoverBorder: "teal-400/50",
              textColor: "teal-300",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className={`bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:transform hover:scale-105 shadow`}
            >
              <div
                className={`w-16 h-16 bg-linear-to-br ${service.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}
              >
                <service.icon size={35} color="#FFFFFF" />
              </div>
              <h3
                className={`text-2xl font-bold mb-4 text-teal-700 ${montserrat.className}`}
              >
                {service.title}
              </h3>
              <p
                className={`text-gray-700 leading-relaxed ${montserrat.className}`}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Key Personnel Section */}

      {keyPersonnel.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-16  ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 ${montserrat.className}`}
              >
                <span className="bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent uppercase">
                  Key Personnel
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-1 bg-teal-400 mx-auto rounded-full"
              />

              <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center my-8">
                Valued partners who inspire our dedication to delivering
                exceptional results.{" "}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className=""
            >
              <KeyPersonnel
                personnels={keyPersonnel}
                colors={["from-emerald-400", "to-blue-400"]}
                companyId={companyData?.id}
              />
            </motion.div>
          </div>
        </section>
      )}

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
      <section className="px-6 md:px-12 lg:px-16 py-16 bg-gray-100">
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
                content:
                  "To address unique demands with precision and accountability across various sectors while upholding stringent Healthcare infrastructure standards by aligning international compliances to ensure durability, safety, and long-term value.",
                color: "teal-400",
                borderColor: "teal-400/20",
              },
              {
                title: "Vision",
                content:
                  "Envision a future where design, construction, and healthcare environments converge to uplift communities. Through innovation and specialized partnerships, we aim to be the partner of choice for quality, compliance, and long-term performance.",
                color: "blue-400",
                borderColor: "blue-400/20",
              },
              {
                title: "Values",
                content:
                  "Driven by clinical precision, patient-centered engineering, and uncompromising safety. We uphold strict regulatory compliance, embrace purposeful innovation, and foster trusted partnerships for resilient healthcare infrastructure.",
                color: "teal-400",
                borderColor: "teal-400/20",
              },
              {
                title: "Sustainability",
                content:
                  "Engineering healthcare environments that minimize environmental impact while maximizing human well-being through energy-efficient systems and smart automation.",
                color: "blue-400",
                borderColor: "blue-400/20",
                tags: ["Renewable Energy", "Water Efficiency", "Low Emissions"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-3xl p-8 md:p-10 border border-gray-200 hover:border-teal-300 transition-colors duration-300 shadow`}
              >
                <h2
                  className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 ${montserrat.className}`}
                >
                  {item.title}
                </h2>
                <p
                  className={`text-lg text-gray-700 leading-relaxed mb-4 ${montserrat.className}`}
                >
                  {item.content}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          tagIdx % 2 === 0
                            ? "bg-teal-100 text-teal-800"
                            : "bg-blue-100 text-blue-800"
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
        <Partners
          partnerships={partnerships}
          lColor="#0D9488"

          rColor="#155dfc"
          id="arrham-healthcare-bahrain"
        />

        {/* Brands Section */}
        {brands.length > 0 && (
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 ${montserrat.className}`}
              >
                <span className="bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent uppercase ">
                  Our Brands
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-1 bg-teal-400 mx-auto rounded-full"
              />

              <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center my-8">
                Showcasing trusted names that represent our commitment to
                quality and innovation.
              </p>
            </div>

            {/* Brand Grid (replacing carousel) */}
            <div className="xl:max-w-[1290px] mx-auto flex flex-wrap justify-center gap-16 mb-8">
              {brands.map((brand) => (
                <a
                  key={brand._id}
                  href={toExternalUrl(brand.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-[140px]"
                >
                  <div className="relative w-full aspect-square rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.img}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                      sizes="140px"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-gray-900 font-medium text-sm sm:text-base capitalize">
                      {brand.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 ${montserrat.className}`}
              >
                <span className="bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent uppercase">
                  Our Projects
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-1 bg-teal-400 mx-auto rounded-full"
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center my-8">
                A portfolio reflecting our expertise, precision, and pursuit of
                excellence.
              </p>
            </div>

            <motion.div
              className={`grid gap-8 ${projects.length === 1 ? 'grid-cols-1 place-items-center' : projects.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}
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
                  onClick={() => openModal(project)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className={`cursor-pointer ${projects.length === 1 ? 'max-w-xl w-full mx-auto' : ''}`}
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

        {/* Certificates Section */}
        {certificates && certificates.length > 0 && (
          <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
            <Certificates
              certificates={certificates}
              lColor="rgb(13, 148, 136)"
              rColor="rgb(37, 99, 235)"
              id="healthcare"
            />
          </section>
        )}

        {/* Clients Section */}
        {clients.length > 0 && (
          <Clients
            imageLogos={clients}
            lColor="#0d9488"
            rColor="#2563eb"
            id="healthcare"
          />
        )}
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
