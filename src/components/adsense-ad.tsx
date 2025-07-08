'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AdSenseAd: React.FC<{ adSlot: string; className?: string }> = ({ adSlot, className }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
