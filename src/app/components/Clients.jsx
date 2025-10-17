"use client";

import LogoLoop from "@/components/LogoLoop";
import React from "react";

const Clients = ({ imageLogos }) => {
  return (
    <section>
      <div className="mt-[50px]">
        <h2 className="text-3xl md:text-5xl text-white uppercase text-center font-extrabold tracking-tight mb-7">
          Our <span className="text-lgreen">Clients</span>
        </h2>
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
