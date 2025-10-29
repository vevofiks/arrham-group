import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Montserrat as MontserratFont } from "next/font/google";


const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});


const colorMap = {
  'teal-600': '#0d9488',
  'blue-600': '#2563eb',
  'emerald-300': '#6ee7b7',
  'emerald-400': '#34d399',
  'emerald-600': '#059669',
  'blue-400': '#60a5fa',
};

const Partners = ({ partnerships = [], lColor = '', rColor = '' }) => {
  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };

  const getGradientStyle = () => {
    console.log('lColor:', lColor, 'rColor:', rColor);
    console.log('lColor value:', colorMap[lColor]);
    console.log('rColor value:', colorMap[rColor]);

    if (lColor && rColor) {
      const style = {
        backgroundImage: `linear-gradient(to right, ${colorMap[lColor] || '#0d9488'}, ${colorMap[rColor] || '#2563eb'})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
      console.log('Final style:', style);
      return style;
    }
    return { color: '#6ee7b7' };
  };

  // Test the style output
  const gradientStyle = getGradientStyle();
  console.log('Applied gradient style:', gradientStyle);

  return (
    <div className="py-16 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 ${montserrat.className}`}
          >
            <span className={`bg-gradient-to-r from-${lColor} to-${rColor} bg-clip-text text-transparent uppercase`}>
              Our Partners
            </span>
          </motion.h2>

          <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-teal-400 mx-auto rounded-full"
            />

        </div>

        {/* Partnership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerships.map((partner) => (
            <div
              key={partner.branchId}
              className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="p-8">
                {/* Company Logo */}
                <div className="relative w-80 h-52 mx-auto mb-6 rounded-xl overflow-hidden bg-slate-100 shadow-md">
                  <Image
                    src={partner.img}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-cover duration-300"
                    sizes="128px"
                  />
                </div>

                <a
                  href={toExternalUrl(partner.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-xl font-bold text-white text-center mb-4 min-h-14 flex items-center justify-center">
                    {partner.name}
                  </h3>

                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;