"use client";
import React from 'react';
import { Hospital, Wrench, Sprout } from 'lucide-react';
import Image from 'next/image';
import { motion } from "motion/react";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function ArrhamHealthcare() {
  const companyName = "Arrham Healthcare Solutions";
  const subName = "Kingdom of Bahrain";

  // Country flag for Bahrain (inline SVG)


  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <Image
          src="/companyDummy.jpeg"
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
      <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
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
      </section>

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
      </section>
    </div>
  );
}

export default ArrhamHealthcare;