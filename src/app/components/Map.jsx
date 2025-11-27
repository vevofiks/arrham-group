"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { mapData } from "../data";

const Map = ({ lat, lon }) => {
  // helper to build Google maps embed url
  const googleMapLocation = (lat, lng) =>
    `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`;

  // Keep iframe src in state so we render only when coords are available
  const [src, setSrc] = useState(null);

  // when lat/lon become available, set the src immediately and load eagerly
  useEffect(() => {
    if (lat !== undefined && lat !== null && lon !== undefined && lon !== null) {
      setSrc(googleMapLocation(lat, lon));
    }
  }, [lat, lon]);

  return (
    <div>
      <div className="w-full h-[400px] overflow-hidden shadow-lg px-3 mb-7 rounded-lg">
        {src ? (
          <iframe
            key={`${lat}-${lon}`}
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900/40 text-zinc-300">
            <p className="text-sm">Map will load when coordinates are available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
