"use client";

import LogoLoop from "@/components/LogoLoop";
import React from "react";
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
        <div
          className={`${montserrat.className}
            ${
              hasGradient
                ? `text-2xl md:text-3xl lg:text-3xl font-extrabold text-transparent bg-clip-text uppercase text-center  mb-7`
                : `text-2xl md:text-3xl lg:text-3xl font-extrabold uppercase text-center  mb-7 text-white`
            }
          `}
          style={
            hasGradient
              ? {
                  backgroundImage: `linear-gradient(to left, ${rColor}, ${lColor})`,
                }
              : null
          }
        >
          {hasGradient ? (
            <>Our Clients</>
          ) : (
            <>
              Our <span className="text-lgreen">Clients</span>
            </>
          )}
        </div>

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

        <div className="relative h-[230px]  mx-auto overflow-hidden mt-20">
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
      </div>
    </section>
  );
};

export default Clients;
