'use client';

import { useEffect } from 'react';

export default function ClientStyleLoader() {
  useEffect(() => {
    // For non-critical CSS, load it after the page has loaded
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = '/css/deferred.css'; // Path relative to public directory
    linkEl.type = 'text/css'; // Explicitly set the MIME type
    linkEl.media = 'all';
    
    // Add it to the document
    document.head.appendChild(linkEl);
    
    return () => {
      // Cleanup on unmount
      if (document.head.contains(linkEl)) {
        document.head.removeChild(linkEl);
      }
    };
  }, []);
  
  return null;
} 