"use client";

import LogoLoop from "@/components/LogoLoop";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Clients = ({ imageLogos, lColor = "", rColor = "", id = "" }) => {
  // if you pass lColor and rColor they will be used as a right-to-left gradient (to left)
  const hasGradient = Boolean(lColor && rColor);

  return (
    <section>
      <div className="mt-[50px]">
        <h2 className={`text-2xl md:text-3xl lg:text-3xl font-extrabold uppercase text-center mb-7 ${montserrat.className}`}>
          {hasGradient ? (
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${lColor}, ${rColor})` }}
            >
              Our Clients
            </span>
          ) : (
            <>
               <span className="text-lgreen">Our Clients</span>
            </>
          )}
        </h2>

        {rColor && rColor !== "rgb(52, 211, 153)" ? (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-linear-to-r from-teal-400 to-blue-500 mx-auto rounded-full"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 flex mx-auto bg-emerald-400 rounded-full"
          />
        )}
        <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center my-8">
          Valued partners who inspire our dedication to delivering exceptional
          results.{" "}
        </p>

        {Array.isArray(imageLogos) && imageLogos.length > 3 ? (
          <div className="relative h-[230px] mx-auto overflow-hidden mt-20">
            <LogoLoop
              logos={imageLogos}
              speed={100}
              direction="right"
              logoHeight={125}
              gap={80}
              pauseOnHover={true}
              scaleOnHover
              fadeOut
              fadeOutColor={id === "healthcare" ? "FFFFFF" : "#000000"}
              ariaLabel="Technology partners"
            />

            <div
              className={`pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r ${
                id === "healthcare" ? "from-transparent" : "from-black"
              } to-transparent`}
            />
            <div
              className={`pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l ${
                id === "healthcare" ? "from-transparent" : "from-black"
              } to-transparent`}
            />
          </div>
        ) : (
          <div className="mt-12">
            
            {imageLogos?.length <= 3 && imageLogos?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-12">
                {imageLogos.map((src, i) => (
                  <div key={i} className="w-[140px]">
                    <div className="relative w-full h-20 sm:h-24">
                      <Image src={src} alt="client logo" fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;
