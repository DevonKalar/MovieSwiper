/**
 *  Usage:
 * 
 *  Within component: 
 *  const isMobile = useMobile(); // For default 768px
 *  const isMobile = useMobile(640); // For custom breakpoint
 *  Returns: isMobile as boolean
 *  
 *  hook is debounced to avoid excessive re-renders during window resizing
 */

import { useState, useEffect } from 'react';

function useMobile(breakpoint = 768) {
  console.log("useMobile hook called with breakpoint:", breakpoint);
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