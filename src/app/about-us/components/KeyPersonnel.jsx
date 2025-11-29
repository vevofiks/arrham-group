"use client";
import React from "react";
import { motion } from "framer-motion";
import { Montserrat as MontserratFont } from "next/font/google";
import Image from "next/image";
import { Calendar, Mail, Phone, Briefcase, GraduationCap } from "lucide-react";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const KeyPersonnel = ({
  personnels = [],
  colors = ["from-teal-600", "to-blue-600"],
  companyId = "",
}) => {
  if (!personnels || personnels.length === 0) return null;

  const isHealthcare = companyId === "arrham-healthcare-bahrain";
  
  const gradientText = `bg-gradient-to-r ${colors[0]} ${colors[1]} bg-clip-text text-transparent`;
  const gradientBg = `bg-gradient-to-br ${colors[0]} ${colors[1]}`;

  const theme = isHealthcare
    ? {
        card: "bg-white border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-600",
        metaIcon: "text-teal-600",
        badge: "bg-white text-gray-700 border border-gray-100 shadow-sm",
        imgBorder: "border-4 border-white shadow-md",
        contactIcon: "text-gray-400 hover:text-teal-600 bg-gray-50 hover:bg-teal-50",
      }
    : {
        card: "bg-gray-900/40 backdrop-blur-sm border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20",
        textPrimary: "text-white",
        textSecondary: "text-gray-300",
        metaIcon: "text-gray-400",
        badge: "bg-gray-800 text-gray-200 border border-gray-700",
        imgBorder: "ring-4 ring-white/5 shadow-inner",
        contactIcon: "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10",
      };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${montserrat.variable}`}>
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <motion.div
            className="
              flex 
              flex-row 
              flex-wrap 
              justify-center 
              gap-6
              w-full
            "
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {personnels.map((person, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                /* UPDATED CARD SIZE:
                   max-w-[300px]: Reduced width for a more compact look.
                   p-6: Standard padding.
                */
                className={`
                  w-full max-w-[300px] flex flex-col
                  border rounded-3xl p-6
                  transition-all duration-300 relative group
                  ${theme.card}
                `}
              >
                {/* --- HEADER: IMAGE & BADGE --- */}
                <div className="relative mb-6 shrink-0">
                  <div className="w-28 h-28 mx-auto relative z-10">
                    {person.profileImage ? (
                      <Image
                        src={person.profileImage}
                        alt={person.name}
                        fill
                        className={`rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 ${theme.imgBorder}`}
                      />
                    ) : (
                      <div
                        className={`
                        ${gradientBg} w-full h-full rounded-2xl
                        flex items-center justify-center text-white text-3xl font-bold shadow-inner
                      `}
                      >
                        {person.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                  </div>

                  {/* Experience Badge */}
                  {person.yearOfExperience && (
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center z-20">
                      <div
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${theme.badge}`}
                      >
                        <Calendar className="w-3 h-3 opacity-70" />
                        <span>{person.yearOfExperience}+ Yrs</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- BODY: INFO --- */}
                <div className="text-center flex flex-col grow">
                  
                  {/* Name */}
                  <div className="min-h-10 flex items-start justify-center mb-1">
                    <h3
                      className={`text-lg font-bold leading-tight ${theme.textPrimary} font-montserrat`}
                    >
                      {person.name}
                    </h3>
                  </div>

                  {/* Metadata Section */}
                  <div className="min-h-16 flex flex-col items-center justify-start gap-1 mb-4">
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      <Briefcase className={`w-3.5 h-3.5 shrink-0 ${theme.metaIcon} opacity-80`} />
                      <p className={`text-xs font-bold uppercase tracking-wide ${gradientText} font-montserrat`}>
                        {person.position}
                      </p>
                    </div>

                    {person.qualification && (
                      <div className="flex items-center justify-center gap-1.5 w-full">
                        <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${theme.metaIcon} opacity-70`} />
                        <p className={`text-[11px] font-semibold opacity-80 ${theme.textSecondary} font-montserrat`}>
                          {person.qualification}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Description - Reduced margins and text size slightly */}
                  {person.description && (
                    <p
                      className={`
                        text-sm leading-relaxed mb-5 line-clamp-4 
                        ${theme.textSecondary} font-montserrat
                      `}
                      title={person.description}
                    >
                      {person.description}
                    </p>
                  )}

                  <div className="grow" />

                  {/* --- FOOTER: CONTACTS --- */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200/10 mt-auto w-full">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className={`transition-all duration-200 p-2 rounded-full border border-transparent hover:border-gray-200/20 shadow-sm hover:shadow ${theme.contactIcon}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {person.phone && (
                      <a
                        href={`tel:${person.phone}`}
                        className={`transition-all duration-200 p-2 rounded-full border border-transparent hover:border-gray-200/20 shadow-sm hover:shadow ${theme.contactIcon}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyPersonnel;