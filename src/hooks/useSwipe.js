import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for handling swipe/drag gestures
 * Supports both mouse and touch events
 * 
 * param {function} onSwipe - Callback function invoked with swipe direction ('left' or 'right')
 * param {number} threshold - Minimum distance in pixels to consider a swipe (default: 50)
 * 
 * returns {object} - containing states for card position and state, and function handling. Use triggerSwipe to programmatically swipe cards. 
 * Provides currentX, isDragging, swipeDirection, handlers, and triggerSwipe function
 * 
 */

export const useSwipe = (onSwipe, threshold = 50) => {
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  
  const startXRef = useRef(0);
  const isProcessingSwipe = useRef(false);
  const swipeDirectionRef = useRef(null);
  const swipeTimeoutRef = useRef(null);

  const handleSwipe = useCallback((direction) => {
    if (isProcessingSwipe.current) return;
    isProcessingSwipe.current = true;
    
    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
    }
    
    swipeTimeoutRef.current = setTimeout(() => {
      onSwipe(direction);
      setCurrentX(0);
      setSwipeDirection(null);
      swipeDirectionRef.current = null;
      isProcessingSwipe.current = false;
      swipeTimeoutRef.current = null;
    }, 300);
  }, [onSwipe]);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentClientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diffX = currentClientX - startXRef.current;
    setCurrentX(diffX);
    
    if (Math.abs(diffX) < threshold) {
      swipeDirectionRef.current = null;
      setSwipeDirection(null);
      return;
    }
    const direction = diffX > 0 ? 'right' : 'left';
    swipeDirectionRef.current = direction;
    setSwipeDirection(direction);
  }, [isDragging, threshold]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const direction = swipeDirectionRef.current;
    if (direction === 'right' || direction === 'left') {
      handleSwipe(direction);
    } else {
      setCurrentX(0);
      setSwipeDirection(null);
    }
  }, [handleSwipe]);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchMove = (e) => handleDragMove(e);
      const handleTouchEnd = () => handleDragEnd();

      const controller = new AbortController();

      window.addEventListener('mousemove', handleMouseMove, { signal: controller.signal });
      window.addEventListener('mouseup', handleMouseUp, { signal: controller.signal });
      window.addEventListener('touchmove', handleTouchMove, { signal: controller.signal });
      window.addEventListener('touchend', handleTouchEnd, { signal: controller.signal });

      return () => {
        controller.abort();
      };
    }
  }, [isDragging]);

  const triggerSwipe = useCallback((direction) => {
    if (!isDragging) {
      setSwipeDirection(direction);
    }
    handleSwipe(direction);
  }, [isDragging, handleSwipe]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentX,
    isDragging,
    swipeDirection,
    isProcessingSwipe: isProcessingSwipe.current,
    useSwipeHandlers: {
      onMouseDown: handleDragStart,
      onTouchStart: handleDragStart,
    },
    triggerSwipe,
  };
};
