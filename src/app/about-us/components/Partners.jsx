"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Montserrat as MontserratFont } from "next/font/google";
import LogoLoop from "@/components/LogoLoop";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Helper for URLs
const toExternalUrl = (url) => {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

// Reusable Section Header with Dynamic linear
const SectionHeader = ({ title, lColor, rColor }) => (
  <div className="text-center mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`text-2xl md:text-3xl lg:text-3xl font-extrabold mb-6 ${montserrat.className}`}
    >
      <span
        className="bg-clip-text text-transparent uppercase"
        style={{
          backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})`,
        }}
      >
        {title}
      </span>
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-24 h-1 mx-auto rounded-full mb-8"
      style={{ backgroundColor: lColor }}
    />

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`text-gray-400 text-lg max-w-2xl mx-auto text-center mb-8 ${montserrat.className}`}
    >
      Collaborating with leading companies and organizations worldwide to deliver excellence.
    </motion.p>
  </div>
);

const Partners = ({
  partnerships, // Using "partnerships" to match your input prop name
  lColor = "#2ec9a2",
  rColor = "#2dd4bf",
}) => {
  if (!partnerships || partnerships.length === 0) return null;

  // Transform data for LogoLoop
  const logoLoopItems = partnerships.map((partner) => ({
    src: partner.img,
    alt: partner.name,
    title: partner.name,
    href: toExternalUrl(partner.url),
  }));

  // Reusable Card Content (Identical styling to Brands)
  const PartnerCardContent = ({ partner }) => (
    <>
      <div
        className="relative w-full aspect-3/2 rounded-xl p-4 flex items-center justify-center overflow-hidden transition-all duration-300 "
      >
        <Image
          src={partner.img}
          alt={`${partner.name} logo`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>
    </>
  );

  return (
    <section className="px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto">
      <SectionHeader title="Our Partners" lColor={lColor} rColor={rColor} />

      {/* CONDITIONAL RENDERING */}
      {partnerships.length > 4 ? (
        // --- CASE A: > 4 Items (Show Infinite Loop) ---
        <div className="w-full py-8">
          <LogoLoop
            logos={logoLoopItems}
            speed={100}
            direction="left"
            logoHeight={125}
            gap={80}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="transparent"
            ariaLabel="Strategic Partners"
          />
        </div>
      ) : (
        // --- CASE B: <= 4 Items (Show Static Grid) ---
        <div className="xl:max-w-[1290px] mx-auto flex flex-wrap justify-center gap-8 md:gap-12">
          {partnerships.map((partner) => {
            const finalUrl = toExternalUrl(partner.url);

            return finalUrl ? (
              // Render as Link if URL exists
              <a
                key={partner._id}
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-40 sm:w-[180px]"
              >
                <PartnerCardContent partner={partner} />
              </a>
            ) : (
              // Render as Div if no URL
              <div
                key={partner._id}
                className="group block w-40 sm:w-[180px]"
              >
                <PartnerCardContent partner={partner} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Partners;