/**
 * useDrag Hook
 * 
 * A custom React hook that enables dragging functionality for a given element.
 * 
 * Params:
 * {Function} onDragEnd - Callback function to be called on drag end
 * 
 * Returns {object} - An object containing:
 * {Boolean} isDragging - Indicates if the element is currently being dragged
 * {Function} onMouseDown - Event handler to initiate dragging
 * {Object} position - Current position of the element being dragged
 */

import { useEffect } from "react";

const useDrag = (onDragEnd) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [dragDistance, setDragDistance] = useState({x: 0, y: 0});

  const controller = new AbortController();

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const distanceX = e.clientX - dragStart.x;
      const distanceY = e.clientY - dragStart.y;
      setDragDistance({ x: distanceX, y: distanceY });
    };

    const handleEnd = (e) => {
      setIsDragging(false);
      onDragEnd(dragDistance);
      setDragDistance({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMove, { signal: controller.signal });
    document.addEventListener('mouseup', handleEnd, { signal: controller.signal });
    document.addEventListener('touchmove', handleMove, { signal: controller.signal });
    document.addEventListener('touchend', handleEnd, { signal: controller.signal });

    return () => {
      controller.abort();
    };

}, [isDragging]);

  return {
    isDragging,
    onMouseDown: handleDragStart,
    position: dragDistance,
  };

};

export default useDrag;
