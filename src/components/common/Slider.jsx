import { useState, useRef, useCallback, useEffect } from "react";

const Slider = ({ min = 1, max = 10, step = 1, value, onChange, label }) => {
  const [range, setRange] = useState({min, max});
  const [dragState, setDragState] = useState({ isDragging: false, dragType: null})
  const sliderRef = useRef(null);

  // convert position to value
  const positionToValue = useCallback((position, trackWidth) => {
    const percentage = Math.max(0, Math.min(1, position / trackWidth));
    const rawValue = min + (percentage * (max - min));
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  }, [min, max, step]);

  // convert value to position percentage
  const valueToPosition = useCallback((value) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  // handle mouse/touch start
  const handleDragStart = useCallback((e, type) => {
    e.preventDefault();
    setDragState({ isDragging: true, dragType: type });
  }, []);

  // handle mouse/touch move
  const handleDragMove = useCallback((e) => {
    if (!dragState.isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const trackRect = sliderRef.current.getBoundingClientRect();
    const position = clientX - trackRect.left;
    const newValue = positionToValue(position, trackRect.width);

    setRange(prev => {
      let newRange = { ...prev };
      if (dragState.dragType === 'min') {
        newRange.min = Math.min(newValue, prev.max - step);
      } else if (dragState.dragType === 'max') {
        newRange.max = Math.max(newValue, prev.min + step);
      }

      if (onChange && (newRange.min !== prev.min || newRange.max !== prev.max)) {
        onChange(newRange);
      }

      return newRange;
    });
}, [dragState, onChange, positionToValue, step]);

// handle mouse/touch end
const handleDragEnd = useCallback(() => {
  setDragState({ isDragging: false, dragType: null });
}, []);

// Add global event listeners dragging
useEffect(() => {
  if (dragState.isDragging) {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e) => handleDragMove(e);
    const handleTouchEnd = () => handleDragEnd();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }
}, [dragState.isDragging, handleDragMove, handleDragEnd]);

const minPosition = valueToPosition(range.min);
const maxPosition = valueToPosition(range.max);

  return (
    <div className="slider-container w-full py-4 mx-2">
      <div className="slider-label">
        <h4>Showing Ratings {range.min} - {range.max}</h4>
      </div>
      <div className="slider-track-container mt-4">
        <div 
          ref={sliderRef}
          className="slider-track relative h-8 bg-gray-200 rounded-full cursor-pointer"
          onClick={(e) => {
            if (dragState.isDragging) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const position = e.clientX - rect.left;
            const clickValue = positionToValue(position, rect.width);

            // Determine whether to move min or max based on proximity
            const distanceToMin = Math.abs(clickValue - range.min);
            const distanceToMax = Math.abs(clickValue - range.max);

            let newRange;
            if (distanceToMin < distanceToMax) {
              newRange = {...range, min: Math.min(clickValue, range.max)};
            } else {
              newRange = {...range, max: Math.max(clickValue, range.min)};
            }

            setRange(newRange);
          
            if (onChange && (newRange.min !== range.min || newRange.max !== range.max)) {
              onChange(newRange);
            }
          }}
        >
          <div 
            className="slider-active-range absolute h-full bg-secondary-500 rounded-full" 
            style={{ 
              left: `${minPosition}%`, 
              right: `${100 - maxPosition}%` 
            }} 
          />
          <div 
            className={`slider-handle-min touch-none absolute top-1/2 transform -translate-y-1/2 -translate-x-2.5 w-8 h-8 bg-white border-2 border-accent-500 rounded-full cursor-grab
               shadow-md transition-transform
              ${dragState.isDragging && dragState.dragType === 'min' ? 'cursor-grabbing' : ''}`}
            style={{ left: `${minPosition}%` }}
            onMouseDown={(e) => handleDragStart(e, 'min')}
            onTouchStart={(e) => handleDragStart(e, 'min')}
          />
          <div 
            className={`slider-handle-max touch-none absolute w-8 h-8 bg-white border-2 border-accent-500 rounded-full cursor-grab
              top-1/2 transform -translate-y-1/2 translate-x-2.5 shadow-md transition-transform
              ${dragState.isDragging && dragState.dragType === 'max' ? 'cursor-grabbing' : ''}`}
            style={{ right: `${ 100 - maxPosition}%` }}
            onMouseDown={(e) => handleDragStart(e, 'max')}
            onTouchStart={(e) => handleDragStart(e, 'max')}
          />
          </div>
        </div>
      </div>
  )
}

export default Slider;