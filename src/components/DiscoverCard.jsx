import { useState, useEffect, useRef } from "react";
import { LikeIcon } from '@icons';
import { PassIcon } from '@icons';

const DiscoverCard = ({ movie, onSwipe, isTop}) => {
  const [currentX, setCurrentX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const cardRef = useRef(null);

const handleDragStart = (e) => {
  setIsDragging(true);
  setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
}

const handleDragMove = (e) => {
  if (!isDragging) return;
  const currentClientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const diffX = currentClientX - startX;
  setCurrentX(diffX);
  if (Math.abs(diffX) < 50) {
    setSwipeDirection(null);
    return;
  }
  setSwipeDirection(diffX > 0 ? 'right' : 'left');
}

const handleDragEnd = () => {
  setIsDragging(false);
  if (swipeDirection === 'right' || swipeDirection === 'left') {
    handleSwipe(swipeDirection);
  } else {
    setCurrentX(0);
    setSwipeDirection(null);
  }
}

const handleSwipe = (direction) => {

  setTimeout(() => {
    onSwipe(direction);
    setCurrentX(0);
    setSwipeDirection(null);
  }, 300);
}

const handleMouseDown = (e) => {
  handleDragStart(e);
}

const handleMouseMove = (e) => {
  handleDragMove(e);
}

const handleMouseUp = (e) => {
  handleDragEnd();
}

const handleTouchStart = (e) => {
  handleDragStart(e);
}

const handleTouchMove = (e) => {
  handleDragMove(e);
}

const handleTouchEnd = (e) => {
  handleDragEnd();
}

useEffect(() => {
  if (isDragging) {
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
}, [isDragging, swipeDirection]);

const handleSubmit = (e) => {
  const buttonValue = e.currentTarget.value;
  switch (buttonValue) {
    case 'yes':
      onSwipe('right');
      break;
    case 'no':
      onSwipe('left');
      break;
    default:
      break;
  }
};

  return (
    <div className="max-w-md mx-auto p-4">
      <div ref={cardRef} style={{ transform: `translateX(${currentX}px)` }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} className={`relative rounded-2xl duration-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
        <div className={`rounded-2xl border-2 ${swipeDirection === 'right' ? 'border-green-500 rotate-20' : swipeDirection === 'left' ? 'border-red-500 -rotate-20' : ''}`}>
        <div className={`flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 rounded-2xl transition-opacity duration-300 ${swipeDirection === 'right' ? 'bg-green-500/25' : swipeDirection === 'left' ? 'bg-red-500/25' : ''}`}>
        {swipeDirection === 'right' ? <h4 className="text-3xl text-success-900 text-bold">Added To Watch List</h4> : swipeDirection === 'left' ? <h4 className="text-3xl text-error-900 text-bold">Rejected!</h4> : null}
        </div>
        <div>
          <img className="rounded-2xl" src={movie.poster} alt="Movie Poster" />
          <div className={`flex flex-row absolute bottom-0 left-0 right-0 justify-center items-end gap-4 h-full py-4 opacity-0 hover:opacity-100 text-white rounded-2xl `}>
            <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-error-500 " value="no"><PassIcon /></button>
            <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-success-500 " value="yes"><LikeIcon /></button>
          </div>
        </div>
        

        </div>      
      </div>
    </div>
  );
};

export default DiscoverCard;
