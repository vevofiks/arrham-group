"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Montserrat as MontserratFont } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function SimpleCard({ branch }) {
  return (
    <motion.div
      className="
        relative w-full sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]
        h-[300px] sm:h-[340px] md:h-[380px]
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-emerald-600/10 via-teal-700/10 to-black/90
        border border-emerald-500/20
        shadow-xl shadow-emerald-900/40
        flex flex-col justify-between
        p-6
        cursor-pointer
      "
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center justify-center flex-1">
        <div className="flex items-center justify-center h-24 w-32 p-10 rounded-2xl shadow-lg">
          <Image
            src={branch.companyIcon}
            alt={branch.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-left">
        <h3
          className={`text-xl font-extrabold tracking-tight text-white ${montserrat.className}`}
        >
          {branch.name}
        </h3>
        <p className="text-sm text-white/70">{branch.country}</p>
      </div>

      {/* Show More Button */}
      <Link href={`/about-us/${branch.id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-4 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 cursor-pointer hover:bg-emerald-500/20 transition-colors"
        >
          <span className="text-sm font-semibold text-emerald-400">
            Show More
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
