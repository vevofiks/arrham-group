import React, { useState } from "react";
import { motion } from "motion/react";
import { mapData } from "../data";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(mapData[0]);

  const googleMapLocation = (lat, lng) =>
    `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`;

  return (
    <div>
      <div className="w-full h-[400px] overflow-hidden shadow-lg px-3 rounded-lg">
        <iframe
          key={`${selectedLocation.lat}-${selectedLocation.lng}`}
          src={googleMapLocation(selectedLocation.lat, selectedLocation.lng)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex items-center gap-4 p-5 justify-evenly flex-wrap">
        {mapData.map((company) => (
          <motion.button
          key={company.lat}
            onClick={() => setSelectedLocation(company)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              selectedLocation.name === company.name
                ? "bg-lgreen text-black"
                : "text-white border border-white hover:bg-lgreen hover:text-black"
            }`}
          >
            {company.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Map;
