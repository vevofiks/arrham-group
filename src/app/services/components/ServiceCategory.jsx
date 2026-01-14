"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const ServiceCategory = ({
  company,
  id,
  title,
  description,
  image,
  services,
  reverse,
}) => {
  return (
    <section
      id={id}
      className={`py-20 px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:flex-row-reverse" : ""
        }`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
      >
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-lgreen">
          {company}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
        <p className="text-white/70 leading-relaxed text-lg">{description}</p>
        <ul className="space-y-3">
          {services.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-white/80 hover:text-lgreen transition"
            >
              <CheckCircle2 className="w-5 h-5 text-lgreen" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default ServiceCategory;
