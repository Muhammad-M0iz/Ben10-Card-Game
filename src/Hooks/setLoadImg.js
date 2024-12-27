import { useState, useEffect } from "react";

export default function useLoadImages(imageUrls) {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const totalImages = imageUrls.length;
    let loadedCount = 0;

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (mounted) {
            loadedCount++;
            setImagesLoaded(loadedCount);
            resolve(url);
          }
        };
        img.onerror = () => {
          if (mounted) {
            loadedCount++;
            setImagesLoaded(loadedCount);
            reject(url);
          }
        };
      });
    };

    Promise.all(imageUrls.map(url => preloadImage(url).catch(err => err)))
      .then(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [imageUrls]);

  return {
    loading,
    progress: imageUrls?.length ? Math.round((imagesLoaded / imageUrls.length) * 100) : 0
  };
}