"use client";

import LogoLoop from "@/components/LogoLoop";
import React from "react";

const Clients = ({ imageLogos, lColor = "", rColor = "" }) => {
  // if you pass lColor and rColor they will be used as a right-to-left gradient (to left)
  const hasGradient = Boolean(lColor && rColor)

  return (
    <section>
      <div className="mt-[50px]">
        <div
          className={
            hasGradient
              ? `text-3xl md:text-5xl text-transparent bg-clip-text uppercase text-center font-extrabold tracking-tight mb-7`
              : `text-3xl md:text-5xl uppercase text-center font-extrabold tracking-tight mb-7 text-white`
          }
          style={hasGradient ? { backgroundImage: `linear-gradient(to left, ${rColor}, ${lColor})` } : undefined}
        >
          {hasGradient ? (
            <>Our Clients</>
          ) : (
            <>
              Our <span className="text-lgreen">Clients</span>
            </>
          )}
        </div>
        <div className="w-24 h-1 bg-lgreen mx-auto my-6 mb-12"></div>

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
            fadeOutColor="#000000"
            ariaLabel="Technology partners"
          />

          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Clients;