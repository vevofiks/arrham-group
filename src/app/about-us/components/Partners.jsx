import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Sample data structure - replace with your actual API data
const samplePartnerships = [
  {
    id: 1,
    name: "TechCorp Solutions", 
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop",
    website: "https://techcorp.example.com"
  },
  {
    id: 2,
    name: "Digital Innovations",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop",
    website: "https://digitalinnovations.example.com"
  },
];

const Partners = ({ partnerships = samplePartnerships , lColor='', rColor=""  }) => {
  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };
  return (
    <div className="py-16 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2

          className={`text-2xl md:text-3xl lg:text-3xl font-bold mb-3 uppercase ${
              lColor && rColor
                ? `bg-gradient-to-r from-${lColor} to-${rColor} text-transparent bg-clip-text`
                : 'text-emerald-300'
            }`}
          >
            Our Partners
          </h2>
          {lColor && rColor ? (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"
            />
          ): (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 flex mx-auto bg-emerald-400 rounded-full"
          />
          )
        
        }

            
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

export default Partners ;