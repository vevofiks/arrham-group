"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectsCard";
import Modal from "../components/modal";
import { DM_Sans, Montserrat as MontserratFont } from "next/font/google";
import KeyPersonnel from "../components/KeyPersonnel";
import { CircleCheckBig, ExternalLink } from "lucide-react";
import { CompanyWorksGallery } from "../components/Gallery";
import RollingGallery from "@/components/RollingGallery";
import Partners from "../components/Partners";
import Clients from "@/app/components/Clients";
import Certificates from "../components/Certificates";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function CompanyDetails({ companyData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clients, setClients] = useState([]);
  const [partners, setPartners] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [keyPersonnel, setKeyPersonnel] = useState([]);
  const partnersCacheRef = React.useRef(new Map());

  const openModal = (index, projectDetails) => {
    setIsOpen(true);
    console.log('project', projectDetails)
    setSelectedProject(projectDetails);
  };

  // Parse company name for main and sub parts
  const parseCompanyName = (name) => {
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);
    return {
      mainName: match ? match[1].trim() : name,
      subName: match ? match[2].trim() : "",
    };
  };

  useEffect(() => {
    const fetchKeyPersonnel = async () => {
      try {
        const response = await fetch(`/api/key-personnel?branchId=${companyData.id}`);
        const data = await response.json();
        setKeyPersonnel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching key personnel:", error);
        setKeyPersonnel([]);
      }
    };

    if (companyData.id) {
      fetchKeyPersonnel();
    }
  }, [companyData.id]);

  // fetch projects data based on company id using query param branchId
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?branchId=${companyData.id}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (companyData.id) {
      fetchProjects();
    }
  }, [companyData.id]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/api/brands?branchId=${companyData.id}`);
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (companyData.id) {
      fetchBrands();
    }
  }, []);

  useEffect(() => {
    if (!companyData?.id) {
      setPartners([]);
      return;
    }

    const cached = partnersCacheRef.current.get(companyData.id);
    if (cached) {
      setPartners(cached);
      return;
    }

    let cancelled = false;
    const fetchPartners = async () => {
      try {
        const res = await fetch(`/api/partners?branchId=${companyData.id}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) {
          setPartners(list);
          partnersCacheRef.current.set(companyData.id, list);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        if (!cancelled) setPartners([]);
      }
    };

    fetchPartners();

    return () => {
      cancelled = true;
    };
  }, [companyData?.id]);

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

  useEffect(() => {
    const fetchClients = async () => {
      console.log('api call has been created for client')
      try {
        const response = await fetch(`/api/clients?branchId=${companyData.id}`);
        const data = await response.json();
        console.log(data, 'clients datas')
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

  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };

  const { mainName, subName } = parseCompanyName(companyData.name || "");

  // Consistent section header component
  const SectionHeader = ({ title, description, color = "emerald" }) => (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 ${montserrat.className}`}
      >
        <span className={`bg-gradient-to-r from-${color}-400 ${companyData.color?.[1] || 'to-blue-600'} bg-clip-text text-transparent uppercase`}>
          {title}
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`w-24 h-1 bg-${color}-400 mx-auto rounded-full mb-8`}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-gray-300 text-lg max-w-2xl mx-auto ${montserrat.className}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );

  // Consistent sub-section header component
  const SubSectionHeader = ({ title, color = "emerald" }) => (
    <div className="text-center mb-8">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-2xl md:text-3xl font-bold text-${color}-400 mb-4 ${montserrat.className}`}
      >
        {title}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`w-20 h-1 bg-${color}-400 mx-auto rounded-full`}
      />
    </div>
  );

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <Image
          src={companyData.companyImg}
          className="h-full w-full object-cover brightness-55"
          fill
          alt={companyData.name}
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 px-6 md:px-12 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto w-full pt-12">
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-1">
              <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 ${montserrat.className}`}
              >
                Welcome to
              </motion.h1>

              {/* Main Company Name */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`bg-gradient-to-r ${companyData.color?.[0] || 'from-blue-400'} ${companyData.color?.[1] || 'to-purple-600'} bg-clip-text text-transparent text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold leading-snug ${montserrat.className}`}
              >
                {mainName}
              </motion.h1>

              <div className="flex-col w-1/2 h-1/2 items-start justify-start">
                {subName && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-300 leading-relaxed max-w-xl ${montserrat.className}`}
                  >
                    {subName}
                  </motion.h2>
                )}

                {(companyData.id === "arrham-trading-bahrain" || companyData.id === "arrham-contracting-ksa") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex justify-center lg:justify-end w-full lg:w-1/2"
                  >
                    <Image
                      src="/threeM-rbg.png"
                      width={400}
                      height={500}
                      className="object-contain drop-shadow-xl w-3/4 sm:w-2/3 md:w-1/2 lg:w-full"
                      alt="Company Logo"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Right - Country Flag */}
          {companyData.countryFlag && (
            <motion.div
              className="absolute bottom-6 right-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden shadow-lg ring-2 ring-white/30">
                {companyData.countryFlag}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* What We Do Section */}
      {companyData.description && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <SectionHeader
            title="What We Do"
            description={null}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <p className={`text-lg md:text-xl leading-relaxed text-gray-300 text-left ${montserrat.className}`}>
              {companyData.description}
            </p>
          </motion.div>
        </section>
      )}

      {/* Arrham Trading Bahrain Specific Section */}
      {companyData.id === "arrham-trading-bahrain" && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-6xl mx-auto">
          {/* Services */}
          {companyData.services && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <SubSectionHeader title="Our Services" />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {companyData.services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl text-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <p className={`text-left ${montserrat.className}`}>{service}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Industries */}
          {companyData.industries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <SubSectionHeader title="Industries We Serve" />

              <div className="flex flex-wrap justify-center gap-3">
                {companyData.industries.map((industry, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium hover:bg-emerald-500/30 transition-colors duration-300 ${montserrat.className}`}
                  >
                    {industry}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Advantages */}
          {companyData.keyAdvantages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SubSectionHeader title="Key Advantages" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                {companyData.keyAdvantages.map((advantage, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 hover:bg-gray-900/80 transition-colors duration-300"
                  >
                    <span className="text-emerald-400 text-xl mt-1">✔</span>
                    <span className={`text-left ${montserrat.className}`}>{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* 3M Section */}
      {companyData.threeM && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={companyData.threeM.logo}
                alt="3M Logo"
                width={300}
                height={120}
                className="mx-auto mb-8"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`max-w-4xl mx-auto mb-12 text-lg md:text-xl text-gray-300 leading-relaxed text-left ${montserrat.className}`}
            >
              {companyData.threeM.description}
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
            {companyData.threeM.services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="p-6 border border-gray-700 rounded-xl bg-gray-900/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className={`text-xl font-bold mb-4 text-center text-gray-100 ${montserrat.className}`}>
                  {service.title}
                </h3>

                <div className="space-y-3">
                  {service.description.map((point, pIdx) => (
                    <p key={pIdx} className={`text-gray-300 text-left leading-relaxed ${montserrat.className}`}>
                      {point}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us */}
          {companyData.threeM.keyAdvantages && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-gray-900/40 rounded-2xl p-8 border border-gray-700"
            >
              <SubSectionHeader title="Why Choose Us" color="teal" />

              <div className="max-w-3xl mx-auto">
                <ul className="space-y-4">
                  {companyData.threeM.keyAdvantages.map((advantage, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`flex items-start gap-3 text-left text-gray-300 leading-relaxed ${montserrat.className}`}
                    >
                      <CircleCheckBig className="text-teal-400 flex-shrink-0 mt-1" size={20} />
                      <span>{advantage}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* Electrical & MEP Section */}
      {companyData.electricalMEP && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <SectionHeader
            title={companyData.electricalMEP.name}
            description={companyData.electricalMEP.description}
          />

          {/* Services */}
          {companyData.electricalMEP.services && (
            <motion.div
              className="grid md:grid-cols-2 gap-8 mb-16"
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
              {companyData.electricalMEP.services.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className={`text-xl font-semibold text-emerald-300 mb-4 ${montserrat.className}`}>
                    {service.title}
                  </h3>
                  <ul className="space-y-2 text-left">
                    {service.points.map((point, i) => (
                      <li key={i} className={`text-gray-200 leading-relaxed flex items-start gap-2 ${montserrat.className}`}>
                        <span className="text-emerald-400 mt-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Industries */}
          {companyData.electricalMEP.industries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <SubSectionHeader title="Industries & Sectors We Serve" />

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {companyData.electricalMEP.industries.map((industry, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`p-4 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 text-center hover:bg-gray-900/80 transition-colors duration-300 ${montserrat.className}`}
                  >
                    {industry}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Strengths */}
          {companyData.electricalMEP.keyAdvantages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SubSectionHeader title="Our Strengths" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {companyData.electricalMEP.keyAdvantages.map((adv, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 hover:bg-gray-900/80 transition-colors duration-300"
                  >
                    <span className="text-emerald-400 text-xl mt-1">⚡</span>
                    <span className={`text-left ${montserrat.className}`}>{adv}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* Key Personnel */}
      {keyPersonnel.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 ${montserrat.className}`}
              >
                <span className={`bg-gradient-to-r from-emerald-400 ${companyData.color?.[1] || 'to-blue-600'} bg-clip-text text-transparent uppercase`}>
                  KEY PERSONNEL
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-1 bg-emerald-400 mx-auto rounded-full"
              />
            </div>

            {/* Key Personnel Component */}
            <KeyPersonnel
              personnels={keyPersonnel}
              colors={companyData.color || ['from-teal-600', 'to-blue-600']}
            />
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <Partners partnerships={partners} />
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <SectionHeader title="Our Brands" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <a
                key={brand._id}
                href={toExternalUrl(brand.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2"
              >
                {/* Logo Container */}
                <div className="aspect-square w-full mb-4 rounded-xl bg-white p-4 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={brand.img}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
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
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <SectionHeader title="Our Projects" />

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
                onClick={() => openModal(projectIdx + 1, project)}
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

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
          <Certificates certificates={certificates} lColor="" rColor="" />
        </section>
      )}


      {
        clients.length > 0 &&
        <Clients imageLogos={clients} lColor="rgb(52, 211, 153)" rColor="rgb(52, 211, 153)" />
      )}

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