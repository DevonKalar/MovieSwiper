import { useState, useCallback, useRef } from 'react';

/** 
 * Use this hook to manage loading states with a minimum display duration.
 * 
 * param {number} minimumMs - Minimum duration (in milliseconds) to show loading state
 * returns {object} - to check isLoading, and functions to start and stop loading
 */

export const useMinimumLoading = (minimumMs = 300) => {
  const [isLoading, setIsLoading] = useState(false);
  const startTimeRef = useRef(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    startTimeRef.current = Date.now();
  }, []);

  const stopLoading = useCallback(() => {
    if (!startTimeRef.current) return;
    
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minimumMs - elapsed);
    
    setTimeout(() => {
      setIsLoading(false);
      startTimeRef.current = null;
    }, remaining);
  }, [minimumMs]);

  return { 
    isLoading, 
    startLoading, 
    stopLoading
  };
};