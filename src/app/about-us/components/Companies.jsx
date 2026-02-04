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
    <Link href={`/about-us/${branch.id}`} className="w-full">
      <motion.div
        className="p-15 rounded-2xl flex flex-col justify-between h-[400px]
          bg-linear-to-br from-emerald-600/10 via-teal-700/10 to-black/90
          border border-emerald-500/20
          shadow-xl shadow-emerald-900/40
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
        <div className="text-left h-20 flex flex-col justify-start">
          <h3
            className={`text-xl font-extrabold tracking-tight text-white ${montserrat.className}`}
          >
            {branch.name}
          </h3>
          <p className="text-sm text-white/70">{branch.country}</p>
        </div>

        {/* Show More Button */}

      </motion.div>
    </Link>
  );
}
