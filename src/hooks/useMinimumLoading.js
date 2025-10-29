/** 
 *  Use this hook to manage loading states with a minimum display duration.
 *  Usage:
 *  const { isLoading, startLoading, stopLoading } = useMinimumLoading(500); // 500ms minimum
 */

import { useState, useCallback, useRef } from 'react';

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