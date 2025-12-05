import { useState, useEffect, useRef } from "react";

// Desktop: 16:9 Aspect Ratio (4K Ultra HD)
const LANDSCAPE_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=100&w=3840&h=2160&fit=crop", // Yosemite
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=100&w=3840&h=2160&fit=crop", // Green Mountains
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=100&w=3840&h=2160&fit=crop", // Blue Lake
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=100&w=3840&h=2160&fit=crop", // Alpine
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=100&w=3840&h=2160&fit=crop", // Tropical
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=100&w=3840&h=2160&fit=crop", // Waterfall
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=100&w=3840&h=2160&fit=crop", // Jungle
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=100&w=3840&h=2160&fit=crop", // Hiker
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=100&w=3840&h=2160&fit=crop", // Sunset
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=100&w=3840&h=2160&fit=crop", // Swiss Alps
];

// Mobile: 9:16 Aspect Ratio (QHD)
const PORTRAIT_IMAGES = [
  "https://images.unsplash.com/photo-1539650116455-251c938b241e?q=100&w=1440&h=2560&fit=crop", // Peru
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=100&w=1440&h=2560&fit=crop", // Bali
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=100&w=1440&h=2560&fit=crop", // Resort
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=100&w=1440&h=2560&fit=crop", // Ocean
  "https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?q=100&w=1440&h=2560&fit=crop", // Forest
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=100&w=1440&h=2560&fit=crop", // Santorini
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=100&w=1440&h=2560&fit=crop", // Cinque Terre
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=100&w=1440&h=2560&fit=crop", // Misty
  "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=100&w=1440&h=2560&fit=crop", // Maldives
  "https://images.unsplash.com/photo-1519046904884-53103b34b271?q=100&w=1440&h=2560&fit=crop", // Sand Texture
];

export function useWallpaper() {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initWallpaper = () => {
      // Improved logic using 769px (Standard Tablet) as the cutoff
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobileWidth = window.innerWidth < 769; // Matches 'tab' breakpoint

      const shouldUsePortrait = isPortrait || isMobileWidth;

      const images = shouldUsePortrait ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
      const storageKey = shouldUsePortrait
        ? "ghurni_bg_history_portrait"
        : "ghurni_bg_history_landscape";

      let seenIndices: number[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        seenIndices = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn("Failed to parse wallpaper history", e);
      }

      let availableIndices = images
        .map((_, i) => i)
        .filter((i) => !seenIndices.includes(i));
      if (availableIndices.length === 0) {
        availableIndices = images.map((_, i) => i);
        seenIndices = [];
      }

      const randomIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentSrc(images[randomIndex]);
      setIsLoading(true);

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify([...seenIndices, randomIndex])
        );
      } catch (e) {
        console.warn("Failed to save wallpaper history", e);
      }
    };

    initWallpaper();
  }, []);

  return { currentSrc, isLoading, setIsLoading };
}
