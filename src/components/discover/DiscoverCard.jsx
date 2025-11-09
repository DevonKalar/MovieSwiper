import { useState, useEffect, useRef } from "react";
import { LikeIcon, PassIcon, RejectIcon, HeartIcon, InfoIcon } from '@icons';
import MovieModal from "../common/MovieModal";
import { useModal } from "@hooks/useModal";

const DiscoverCard = ({ movie, onSwipe, isLoading, style, isTopCard = true }) => {
  const [currentX, setCurrentX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const isProcessingSwipe = useRef(false);
  const cardRef = useRef(null);
  const { modalId, openModal, closeModal } = useModal();

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

const handleMouseDown = (e) => handleDragStart(e);
const handleMouseMove = (e) => handleDragMove(e);
const handleMouseUp = (e) => handleDragEnd();

const handleTouchStart = (e) => handleDragStart(e);
const handleTouchMove = (e) => handleDragMove(e);
const handleTouchEnd = (e) => handleDragEnd();

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
  if (!isDragging) {
    // makes sure button clicks also trigger swipe
    setSwipeDirection(buttonValue);
  }
  e.preventDefault();
  isProcessingSwipe.current = true;
  setTimeout(() => {
    onSwipe(buttonValue);
    setCurrentX(0);
    setSwipeDirection(null);
    isProcessingSwipe.current = false;
  }, 300)
};

	if (isLoading) {
    return (
        <div className="absolute flex justify-center items-center w-full max-w-[500px] aspect-2/3 rounded-2xl border-2 bg-primary-400 animate-pulse">
            <h4 className="text-3xl text-bold animate-pulse">Getting Movies...</h4>
        </div>
    );
  };

  return (
    <>
      <article 
        ref={cardRef} 
        style={{ 
          transform: `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`,
          ...style 
        }} 
        onMouseDown={handleMouseDown} 
        onTouchStart={handleTouchStart} 
        className={`absolute rounded-2xl duration-0 aspect-2/3 max-w-[500px] overflow-hidden select-none
          ${swipeDirection 
            ? 'touch-none' 
            : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        aria-label={`Movie card for ${movie.title}. Swipe right to like, swipe left to pass.`}
        aria-hidden={!isTopCard}
      >
        {swipeDirection && (
          <div 
            className={`absolute rounded-2xl w-full h-full border-2 z-10 flex items-center justify-center transition-opacity duration-300
              ${swipeDirection === 'right' 
                ? 'border-green-500 bg-green-500/25' 
                : 'border-red-500 bg-red-500/25'}`}
            aria-hidden="true"
          >
            {swipeDirection === 'right' 
              ? <HeartIcon className="h-16 w-16 rounded-full text-success-900 p-2 bg-success-500/25" aria-hidden="true" /> 
              : <RejectIcon className="h-16 w-16 text-error-900 p-2 bg-error-500/25 rounded-full" aria-hidden="true" />}
          </div>
        )}
        <div>
          <img className="bg-primary-400 object-cover aspect-2/3" src={movie.poster} alt={`${movie.title} movie poster`} />
          <div className={`flex flex-row group absolute bottom-0 left-0 right-0 justify-center items-end gap-4 h-full py-4 opacity-0 hover:opacity-100 focus-within:opacity-100 text-white rounded-2xl `} 
            role="group"
            aria-label="Movie actions"
          >
            <button onClick={handleSubmit} 
              disabled={isProcessingSwipe.current} 
              className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 rounded-full w-16 h-16 bg-error-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:opacity-100" 
              value="left" 
              aria-label={`Pass on ${movie.title}`}><PassIcon 
              aria-hidden="true" />
            </button>
            <button onClick={handleSubmit} 
              disabled={isProcessingSwipe.current} 
              className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 rounded-full w-16 h-16 bg-success-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:opacity-100" 
              value="right" 
              aria-label={`Add ${movie.title} to watchlist`}><LikeIcon 
              aria-hidden="true" />
            </button>
          </div>
          <button onClick={() => openModal(movie.id)} className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full text-white bg-transparent z-50" aria-label={`View details for ${movie.title}`}>
            <InfoIcon className="w-8 h-8 bg-secondary-500 rounded-full" aria-hidden="true" />
          </button>
        </div>
      </article>
      <MovieModal movie={movie} isOpen={modalId === movie.id} closeModal={closeModal} />
    </>
  );
};

export default DiscoverCard;
