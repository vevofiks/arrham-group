"use client"
import React from 'react';
import { Hospital , Wrench , Sprout } from 'lucide-react';
import Image from 'next/image';
import {motion} from "motion/react";

function ArrhamHealthcare() {

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
            className="text-blue-400 bg-clip-text px-4 py-2 text-3xl md:text-6xl text-center font-extrabold"
          >
              Arrham Trading and Contracting
              <br />
              W.L.L. (Kingdom of Bahrain)

          </motion.h1>

        </div>
      </div>

      {/* What We Do Section */}
      <section className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-4">
            WHAT <span className="text-blue-400 font-extrabold">WE DO</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-12"></div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16">
            Multifaceted firm offering commercial/residential/industrial fit-outs, 3M window films, 
            smart glass, automotive films, and architectural finishes. Ideal for retail, offices, and 
            automotive spaces with cutting-edge healthcare infrastructure solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-teal-400/20 hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl"><Hospital size={35} /></span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-300">Healthcare Excellence</h3>
              <p className="text-gray-300">Specialized in designing and constructing state-of-the-art medical facilities with global compliance standards.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl"><Wrench size={35} /></span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Turnkey Solutions</h3>
              <p className="text-gray-300">Complete project execution from concept to handover, ensuring seamless integration and superior quality.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-teal-400/20 hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl"><Sprout size={35} /></span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-300">Sustainable Design</h3>
              <p className="text-gray-300">Environmental consciousness integrated into every project with energy-efficient and eco-friendly solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Personnels Section */}
      <section className="py-24 px-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">
            KEY <span className="text-blue-400">PERSONNELS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-16"></div>
          
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-teal-400/30 max-w-md">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto text-4xl font-bold">
                F
              </div>
              <h3 className="text-3xl font-bold mb-2 text-teal-300">Faisal Al Mansoor</h3>
              <p className="text-xl text-blue-300 mb-4">Country Operations Head - Bahrain</p>
              <p className="text-gray-300">12+ years in fit-out and retail verticals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            WHO <span className="text-blue-400">WE ARE</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-teal-400 font-semibold">Arrham Trading and Contracting W.L.L.</span> is a dynamic and multifaceted firm specializing in high-quality construction, fit-out, and contracting services across Commercial, Residential, and Industrial sectors. Built on integrity, innovation, and professionalism.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-blue-400 font-semibold">Hidaya Healthcare W.L.L.</span> is our specialized entity focused exclusively on healthcare infrastructure development, bringing together multidisciplinary expertise in medical compliance, hygiene protocols, and patient-centric design.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-teal-400/20">
              <h3 className="text-3xl font-bold mb-6 text-teal-300">Our Healthcare Expertise</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><strong className="text-white">Hospitals & Medical Centers:</strong> Full-scale in-patient and out-patient facilities, operating theatres, ICUs, labs, and imaging suites.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><strong className="text-white">Clinics & Day Surgery Centers:</strong> Functional layouts with medical gas systems and infection control zones.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><strong className="text-white">Diagnostic & Imaging Facilities:</strong> MRI, CT, X-Ray units with specialized radiation shielding.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><strong className="text-white">Wellness & Rehabilitation:</strong> Healing environments with hydrotherapy, physio, and wellness zones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 px-8 bg-gradient-to-br from-gray-800/50 to-teal-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-teal-400/20">
              <h2 className="text-4xl font-bold mb-6 text-teal-400">Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To address unique demands with precision and accountability across various sectors while upholding stringent Healthcare infrastructure standards by aligning international compliances to ensure durability, safety, and long-term value.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-blue-400/20">
              <h2 className="text-4xl font-bold mb-6 text-blue-400">Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Envision a future where design, construction, and healthcare environments converge to uplift communities. Through innovation and specialized partnerships, we aim to be the partner of choice for quality, compliance, and long-term performance.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-teal-400/20">
              <h2 className="text-4xl font-bold mb-6 text-teal-400">Values</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Driven by clinical precision, patient-centered engineering, and uncompromising safety. We uphold strict regulatory compliance, embrace purposeful innovation, and foster trusted partnerships for resilient healthcare infrastructure.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-blue-400/20">
              <h2 className="text-4xl font-bold mb-6 text-blue-400">Sustainability</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Engineering healthcare environments that minimize environmental impact while maximizing human well-being through energy-efficient systems and smart automation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full text-sm">Renewable Energy</span>
                <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-sm">Water Efficiency</span>
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full text-sm">Low Emissions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-16">
            OUR <span className="text-blue-400">PROJECTS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-teal-400/20 hover:border-teal-400/50 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-teal-300">Nuwaidrat Retail Fit-Out</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Completed</span>
              </div>
              <div className='flex justify-between items-center mt-4' >
                <p className="text-gray-300 mb-4">Sitrah, Bahrain</p>
                <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-2 py-2 rounded-full transition-all duration-300">
                Show More
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-blue-300">AutoCare Center Setup</h3>
                <span className="bg-cyan-500/60 text-white px-3 py-1 rounded-full text-sm font-medium">In Progress</span>
              </div>
                <div className='flex justify-between items-center mt-4' >
                <p className="text-gray-300 mb-4">Sitrah, Bahrain</p>
                <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-2 py-2 rounded-full transition-all duration-300">
                Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ArrhamHealthcare