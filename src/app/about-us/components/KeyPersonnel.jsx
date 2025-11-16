"use client";
import React from "react";
import { motion } from "framer-motion";
import { Montserrat as MontserratFont } from "next/font/google";
import Image from "next/image";
import { Calendar, Mail, Phone } from "lucide-react";

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
  const gradientClasses = `bg-gradient-to-br ${colors[0]} ${colors[1]}`;

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12">
      {/* EXPANDED CONTAINER → allows 4 cards to fit perfectly */}
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PERSONNEL GRID */}
        <motion.div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-10 
            w-full 
            place-items-center 
            justify-items-center
          "
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
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
              transition={{ duration: 0.6 }}
              className={`
                w-full max-w-xs
                ${
                  isHealthcare
                    ? "bg-white border border-gray-200 shadow-lg hover:shadow-2xl"
                    : "bg-transparent border border-gray-200 text-white hover:shadow-xl"
                }
                group rounded-2xl p-6 sm:p-7 md:p-8 
                transition-all duration-300 relative
              `}
            >
             
              {/* PROFILE IMAGE */}
              <div className="relative mb-8">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative">
                  {person.profileImage ? (
                    <Image
                      src={person.profileImage}
                      alt={person.name}
                      fill
                      className={
                        isHealthcare
                          ? "rounded-md object-cover border-4 border-white shadow-lg"
                          : "rounded-md object-cover ring-2 ring-white/10 group-hover:ring-white/20 shadow-lg transition"
                      }
                    />
                  ) : (
                    <div
                      className={`
                        ${gradientClasses} w-full h-full rounded-full
                        flex items-center justify-center text-white text-3xl font-bold
                      `}
                    >
                      {person.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                {/* EXPERIENCE BADGE */}
                {person.yearOfExperience && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full flex justify-center">
                    <div
                      className={`px-4 py-1 rounded-full text-xs font-semibold shadow flex items-center gap-1
                        ${
                          isHealthcare
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-600 text-white"
                        }
                      `}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{person.yearOfExperience}+ years</span>
                    </div>
                  </div>
                )}
              </div>

              {/* PERSON INFO */}
              <div className="text-center space-y-4">
                <h3
                  className={`${montserrat.className} text-lg font-semibold ${
                    isHealthcare ? "text-gray-900" : "text-white"
                  }`}
                >
                  {person.name}
                </h3>

                <p
                  className={`text-base font-medium bg-clip-text text-transparent ${gradientClasses} ${montserrat.className}`}
                >
                  {person.position}
                </p>

                {person.description && (
                  <p
                    className={`text-sm leading-relaxed ${
                      isHealthcare ? "text-gray-700" : "text-gray-200"
                    } ${montserrat.className}`}
                  >
                    {person.description}
                  </p>
                )}

                {/* CONTACT */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className={`${
                        isHealthcare ? "text-gray-700" : "text-gray-200"
                      } hover:opacity-80`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {person.phone && (
                    <a
                      href={`tel:${person.phone}`}
                      className={`${
                        isHealthcare ? "text-gray-700" : "text-gray-200"
                      } hover:opacity-80`}
                    >
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

export default KeyPersonnel;
