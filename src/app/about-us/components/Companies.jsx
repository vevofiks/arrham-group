"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Code2, Copy, Rocket, Zap } from "lucide-react";
import { Montserrat as MontserratFont } from "next/font/google";
import { useRouter } from "next/navigation";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function CardFlipHero({ branch }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter()
  return (
    <motion.div
      className="group relative h-[380px] w-full max-w-[320px] [perspective:2000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className={`
    absolute inset-0 h-full w-full
    rounded-2xl overflow-hidden
    [backface-visibility:hidden]
    bg-gradient-to-br from-emerald-600/10 via-teal-700/10 to-black/90
    border border-emerald-500/20
    shadow-xl shadow-emerald-900/40
    flex flex-col justify-between
    p-6
    ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}
  `}
        >
          {/* Glow background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-400/20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center rocket icon */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1">
            <motion.div
              className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-400 to-emerald-600 shadow-lg shadow-emerald-500/30"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <div className="relative z-10 text-left">
            <h3
              className={`text-xl font-extrabold tracking-tight text-white ${montserrat.className}`}
            >
              {branch.name}
            </h3>
            <p className="text-sm text-white/70">{branch.location}</p>
          </div>
        </div>

        {/* Back */}
        {/* Back */}
        <div
          className={`
    absolute inset-0 h-full w-full
    rounded-2xl p-6
    [backface-visibility:hidden] [transform:rotateY(180deg)]
    bg-gradient-to-br from-black/90 via-teal-900/90 to-emerald-950/90
    border border-emerald-500/20
    shadow-xl shadow-emerald-900/50
    flex flex-col
    ${isFlipped ? "pointer-events-auto" : "pointer-events-none"}
  `}
        >
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {/* Title & Description */}
            <div className="flex items-center gap-2">

              <h3
                className={`text-lg font-bold tracking-tight text-white ${montserrat.className}`}
              >
                {branch.name}
              </h3>
            </div>

            <p className="text-sm text-white/70">{branch.shortDescription}</p>

            <div className="space-y-3">
              {branch.services.map((service, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const Icon = icons[index % icons.length];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isFlipped ? 1 : 0,
                      x: isFlipped ? 0 : -10,
                    }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20">
                      <Icon className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{service}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-4 Z-10 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 cursor-pointer hover:bg-emerald-500/20 transition-colors"
            onClick={() => {
              router.push(`/about-us/${branch.id}`)
            }}
          >
            <span className="text-sm font-semibold text-emerald-400">
              Show More
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
}
