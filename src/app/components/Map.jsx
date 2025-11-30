import React from 'react';

const Map = ({ location }) => {
  if (!location) return null;

  return (
    <div className="w-full h-[400px] overflow-hidden shadow-lg px-3 mb-7 rounded-lg relative bg-zinc-900/40 border border-white/10">
      <iframe
        title="Location Map"
        src={location}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-lg fade-in animate-in duration-500 grayscale hover:grayscale-0 transition-all"
      />
    </div>
  );
};

export default Map;