'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

export default function WebVitalsTracker() {
  useEffect(() => {
    let cancelled = false;

    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      if (cancelled) return;
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onINP(sendToAnalytics);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
