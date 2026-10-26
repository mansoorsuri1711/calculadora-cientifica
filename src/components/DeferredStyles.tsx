'use client';

import { useEffect } from 'react';

export default function DeferredStyles() {
  useEffect(() => {
    // Delay loading to prevent CLS
    const timer = setTimeout(() => {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = '/css/deferred.css';
      linkEl.type = 'text/css';
      linkEl.media = 'all';
      // Prevent layout shift by loading after initial paint
      linkEl.setAttribute('data-deferred', 'true');
      
      document.head.appendChild(linkEl);
    }, 100); // Small delay to ensure content is painted first
    
    return () => {
      clearTimeout(timer);
      const linkEl = document.querySelector('link[data-deferred="true"]');
      if (linkEl && document.head.contains(linkEl)) {
        document.head.removeChild(linkEl);
      }
    };
  }, []);
  
  return null;
} 