import { useState, useEffect } from "react";

export default function useLoadImages() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = document.getElementsByTagName('img');
    
    if (images.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoading(false);
      }
    };

    Array.from(images).forEach(img => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleLoad); // Count errors as loaded to avoid stuck state
      }
    });

    // Cleanup
    return () => {
      Array.from(images).forEach(img => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  return loading;
}