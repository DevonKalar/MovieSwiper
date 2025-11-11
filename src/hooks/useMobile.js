import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the current viewport is considered mobile
 * 
 * param {number} breakpoint - Width in pixels to define mobile (default: 768)
 * returns {boolean} isMobile - Whether the viewport is considered mobile
 *  
 * hook is debounced to avoid excessive re-renders during window resizing
 */

function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint
  );

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      // Clear existing timeout
      clearTimeout(timeoutId);
      
      // Debounce the resize handler
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
      }, 150);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;