"use client"

import { useEffect, useState } from 'react';

/**
 * Detect if device is mobile at initial load
 * More efficient than using window.matchMedia in every component
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set initial value after hydration
    setIsMobile(window.innerWidth < 768);
    setIsHydrated(true);

    // Listen for resize but with debounce
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return isMobile && isHydrated;
};

export default useIsMobile;
