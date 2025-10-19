import React from 'react';
import { ExternalLink } from 'lucide-react';

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
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
  className={`text-5xl font-bold mb-3 ${
    lColor && rColor
      ? `bg-gradient-to-r from-${lColor} to-${rColor} text-transparent bg-clip-text`
      : 'text-emerald-300'
  }`}
>
  Our Partnerships
</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
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
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden bg-slate-100 shadow-md">
                  <img
                    src={partner.img}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-cover duration-300"
                  />
                </div>

                <a
                  href={partner.url}
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