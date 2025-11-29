// components/MetallicLogo.jsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import MetallicPaint, {parseLogoImage} from '@/components/MetallicPaint';

export const MetallicLogo = ({ src, width, height }) => {
  const [imageData, setImageData] = useState(null);

  // OPTIMIZED PARAMS FOR SMALL ICONS (50x50)
  // Standard params look bad on small icons. We need high scale and sharp edges.
  const paintParams = useMemo(() => ({
    edge: 5,    
    patternBlur: 0.001,
    patternScale: 5.0,
    refraction: 0.8, 
    speed: 0.3,
    liquid: 0.05
  }), []);

  useEffect(() => {
    let isMounted = true;

    async function prepareImage() {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const file = new File([blob], "logo.png", { type: blob.type });
        const parsedData = await parseLogoImage(file);

        if (isMounted && parsedData?.imageData) {
          setImageData(parsedData.imageData);
        }
      } catch (err) {
        console.error("Logo load failed:", err);
      }
    }

    prepareImage();
    return () => { isMounted = false; };
  }, [src]);

  // 1. Loading State: Show static Next.js Image
  if (!imageData) {
    return (
      <Image 
        src={src} 
        alt="logo" 
        width={width} 
        height={height} 
        className="object-contain" 
      />
    );
  }

  // 2. Ready State: Show Metallic Effect
  return (
    <div style={{ width, height, position: 'relative' }}>
      <MetallicPaint 
        imageData={imageData} 
        params={paintParams} 
        className="rounded-full" // Optional: if you want a round logo
      />
    </div>
  );
};