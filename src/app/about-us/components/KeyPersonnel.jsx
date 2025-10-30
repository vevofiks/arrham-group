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

const KeyPersonnel = ({ personnels = [], colors = ['from-teal-600', 'to-blue-600'] , companyId="" }) => {
  if (!personnels || personnels.length === 0) {
    return null;
  }

  // Decide variant: healthcare (white cards) or transparent sleek (glass) for others
  const isHealthcare = companyId === 'arrham-healthcare-bahrain';

  const gradientClasses = `bg-gradient-to-br ${colors[0]} ${colors[1]}`;
  console.log('KeyPersonnel colors:', colors, 'gradientClasses:', gradientClasses);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-10">

        {/* Personnel Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
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
          {personnels.map((person, index) => (
            <motion.div
              key={person._id || index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={
                  isHealthcare
                    ? 'group relative rounded-3xl p-3 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300'
                    : 'group relative rounded-3xl p-8 bg-transparent border border-transparent text-white transition-all duration-300 hover:shadow-lg overflow-hidden'
                }
            >
              {/* Top accent bar for transparent variant */}
              {!isHealthcare && (
                <div className={`absolute -top-6 left-6 right-6 h-2 rounded-full opacity-90 ${gradientClasses}`} aria-hidden />
              )}

              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {person.profileImage ? (
                    <Image
                      src={person.profileImage}
                      alt={person.name}
                      fill
                      className={
                        isHealthcare
                          ? 'rounded-full object-cover border-4 border-white shadow-lg'
                          : 'rounded-full object-cover ring-2 ring-white/10 shadow-lg group-hover:ring-white/20 transition-all duration-300'
                      }
                      sizes="128px"
                    />
                  ) : (
                    <div className={
                      isHealthcare
                        ? `w-full h-full ${gradientClasses} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg`
                        : `w-full h-full ${gradientClasses} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg`
                    }>
                      {person.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>

                {/* Experience Badge */}
                {person.yearOfExperience && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className={isHealthcare ? 'bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold shadow' : 'bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow flex items-center gap-1'}>
                      <Calendar className={isHealthcare ? 'w-4 h-3 text-gray-700 inline mb-1' : 'w-3 h-3 text-white'} />
                      <span>{person.yearOfExperience}+ years</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Personnel Info */}
              <div className={`text-center space-y-4`}>
                <div>
                  <h3 className={`${isHealthcare ? 'text-2xl text-gray-900' : 'text-2xl text-white'} font-bold mb-1 group-hover:text-opacity-90 transition-colors duration-300 ${montserrat.className}`}>
                    {person.name}
                  </h3>

                  <p className={`text-lg font-semibold bg-clip-text text-transparent ${gradientClasses} ${montserrat.className}` + (isHealthcare ? '' : ' inline-block')}>
                    {person.position}
                  </p>
                </div>

                {person.description && (
                  <p className={`${isHealthcare ? 'text-gray-700' : 'text-gray-200'} leading-relaxed ${montserrat.className}`}>
                    {person.description}
                  </p>
                )}

                {/* Contact Row */}
                <div className="flex items-center justify-center gap-4 mt-2">
                  {person.email && (
                    <a href={`mailto:${person.email}`} className={isHealthcare ? 'text-gray-700' : 'text-gray-200'} aria-label={`Email ${person.name}`}>
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone}`} className={isHealthcare ? 'text-gray-700' : 'text-gray-200'} aria-label={`Call ${person.name}`}>
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyPersonnel