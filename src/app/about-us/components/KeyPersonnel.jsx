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
    <section className="py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

        {/* Personnel Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
              className={`${(() => { const total = personnels.length; const rem = total % 3 || 3; const startIndexLastRow = total - rem; if (index < startIndexLastRow || rem === 3) return ""; const pos = index - startIndexLastRow; if (rem === 1) return "lg:col-start-2"; if (rem === 2) return pos === 0 ? "lg:col-start-1" : "lg:col-start-3"; return ""; })()} ${
                  isHealthcare
                    ? 'group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white'
                    : 'group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 bg-transparent border border-gray-200 text-white transition-all duration-300 hover:shadow-lg overflow-hidden'
                }`}
            >
              {/* Top accent bar for transparent variant */}
              {!isHealthcare && (
                <div className={`absolute -top-4 sm:-top-5 md:-top-6 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-1.5 sm:h-2 rounded-full opacity-90 ${gradientClasses}`} aria-hidden />
              )}

              {/* Profile Image */}
              <div className="relative mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto relative">
                  {person.profileImage ? (
                    <Image
                      src={person.profileImage}
                      alt={person.name}
                      fill
                      className={
                        isHealthcare
                          ? 'rounded-md object-cover border-2 sm:border-[3px] md:border-4 border-white shadow-lg'
                          : 'rounded-md object-cover ring-1 sm:ring-2 ring-white/10 shadow-lg group-hover:ring-white/20 transition-all duration-300'
                      }
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    />
                  ) : (
                    <div className={
                      isHealthcare
                        ? `w-full h-full ${gradientClasses} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-lg`
                        : `w-full h-full ${gradientClasses} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-lg`
                    }>
                      {person.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>

                {/* Experience Badge */}
                {person.yearOfExperience && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 sm:mt-2">
                    <div className={isHealthcare ? 'bg-gray-100 text-gray-800 px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow flex items-center gap-1' : 'bg-gray-500 text-white px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow flex items-center gap-1'}>
                      <Calendar className={isHealthcare ? 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-3 text-gray-700' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 text-white'} />
                      <span>{person.yearOfExperience}+ years</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Personnel Info */}
              <div className={`text-center space-y-3 sm:space-y-4`}>
                <div>
                  <h3 className={`${isHealthcare ? 'text-base sm:text-lg md:text-xl text-gray-900' : 'text-base sm:text-lg md:text-xl text-white'} font-semibold mb-1 group-hover:text-opacity-90 transition-colors duration-300 ${montserrat.className}`}>
                    {person.name}
                  </h3>

                  <p className={`text-sm sm:text-base md:text-lg font-medium bg-clip-text text-transparent ${gradientClasses} ${montserrat.className}` + (isHealthcare ? '' : ' inline-block')}>
                    {person.position}
                  </p>
                </div>

                {person.description && (
                  <p className={`${isHealthcare ? 'text-gray-700' : 'text-gray-200'} text-sm sm:text-base leading-relaxed ${montserrat.className}`}>
                    {person.description}
                  </p>
                )}

                {/* Contact Row */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
                  {person.email && (
                    <a href={`mailto:${person.email}`} className={`${isHealthcare ? 'text-gray-700' : 'text-gray-200'} hover:opacity-80 transition-opacity`} aria-label={`Email ${person.name}`}>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone}`} className={`${isHealthcare ? 'text-gray-700' : 'text-gray-200'} hover:opacity-80 transition-opacity`} aria-label={`Call ${person.name}`}>
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
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