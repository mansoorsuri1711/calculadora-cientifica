'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function MobileOptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: MobileOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });
  const [imageSizes, setSizes] = useState(`${width}px`);

  // Detect mobile device and set dimensions after component mounts
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      
      if (mobile) {
        const mobileWidth = Math.min(width, window.innerWidth - 32);
        const mobileHeight = Math.round((height * mobileWidth) / width);
        setDimensions({ width: mobileWidth, height: mobileHeight });
        setSizes(`(max-width: 768px) ${mobileWidth}px, ${width}px`);
      } else {
        setDimensions({ width, height });
        setSizes(`${width}px`);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [width, height]);

  return (
    <div 
      className={`relative ${className} ${!isLoaded ? 'bg-gray-800 animate-pulse' : ''}`}
      style={{ 
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={`object-contain hardware-accelerated ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes={imageSizes}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
} 