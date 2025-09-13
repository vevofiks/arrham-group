import React, { useState } from "react";
import { motion } from "motion/react";
import { mapData } from "../data";

const Map = ({ lat , lon }) => {

  const googleMapLocation = (lat, lng) =>
    `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`;

  return (
    <div>
      <div className="w-full h-[400px] overflow-hidden shadow-lg px-3 mb-7 rounded-lg">
        <iframe
          key={`${lat}-${lon}`}
          src={googleMapLocation(lat, lon)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default Map;
