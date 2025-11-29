"use client";
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const Map = ({ lat, lon }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth loading animation
    const timer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const hasCoordinates = lat && lon;
  
  if (!hasCoordinates) return null;

  return (
    <div className="w-full h-[400px] overflow-hidden shadow-lg px-3 mb-7 rounded-lg relative bg-zinc-900/40">
      
      {!isReady && (
        <div className="w-full h-full bg-zinc-800/30 animate-pulse rounded-lg flex flex-col items-center justify-center border border-white/5">
          <MapPin className="w-8 h-8 text-teal-500/50 mb-2" />
          <span className="text-zinc-500 text-sm">Loading Map...</span>
        </div>
      )}

      {isReady && (
        <iframe
          key={`${lat}-${lon}`}
          title="Location Map"
          src={`https://maps.google.com/maps?q=${lat},${lon}&z=14&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-lg fade-in animate-in duration-500"
        />
      )}
    </div>
  );
};

export default Map;