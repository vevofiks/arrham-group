"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Montserrat as MontserratFont } from "next/font/google";
import Image from 'next/image';
import { Calendar, Mail, Phone } from 'lucide-react';

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const KeyPersonnel = ({ personnels = [], colors = ['from-teal-600', 'to-blue-600'] }) => {
  if (!personnels || personnels.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-white text-lg max-w-2xl mx-auto ${montserrat.className}`}
          >
            Meet our experienced leadership team driving excellence and innovation
          </motion.p>
        </div>

        {/* Personnel Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {personnels.map((person, index) => (
            <motion.div
              key={person._id || index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gray-200 rounded-3xl p-8 border border-lgreen hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {person.profileImage ? (
                    <Image
                      src={person.profileImage}
                      alt={person.name}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-lg group-hover:border-teal-100 transition-colors duration-300"
                      sizes="128px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {person.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                
                {/* Experience Badge */}
                {person.yearOfExperience && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{person.yearOfExperience}+ years</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Personnel Info */}
              <div className="text-center space-y-4">
                <div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors duration-300 ${montserrat.className}`}>
                    {person.name}
                  </h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}>
                    {person.position}
                  </p>
                </div>

                {person.description && (
                  <p className={`text-gray-600 leading-relaxed ${montserrat.className}`}>
                    {person.description}
                  </p>
                )}               
              </div>

              {/* Background Decoration */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyPersonnel;