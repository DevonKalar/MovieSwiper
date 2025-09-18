import { useState, useEffect, useRef } from "react";
import { useMovies } from "@providers/MoviesContext.jsx";
import { LikeIcon } from '@icons/exports.jsx';
import { PassIcon } from '@icons/exports.jsx';

const SwipeCard = () => {
  const { likeMovie, rejectMovie, movieQueue } = useMovies();
  const [activeMovie, setActiveMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardAction, setCardAction] = useState(null); // 'like' or 'reject'
  const [currentX, setCurrentX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const cardRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (movieQueue.length > 0) {
      setActiveMovie(movieQueue[0]);
      setIsLoading(false);
    }
  }, [movieQueue]);

const actionHelper = (action, actionFunction) => {
  console.log(`Action: ${action}, Movie: ${activeMovie.title}`);
  setCardAction(action);
  setTimeout(() => {
    actionFunction(activeMovie);
    setCardAction(null);
  }, 1000);
};

const handleSubmit = (e) => {
  const buttonValue = e.currentTarget.value;
  
  switch (buttonValue) {
    case 'yes':
      actionHelper('like', likeMovie);
      break;
    case 'no':
      actionHelper('reject', rejectMovie);
      break;
    default:
      break;
  }
};

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

useEffect(() => {
  console.log("swipeDirection updated:", swipeDirection);
}, [swipeDirection]);

const handleDragEnd = () => {
  console.log(`Drag ended. FinalX: ${currentX}, Direction: ${swipeDirection}`);
  setIsDragging(false);
  if (swipeDirection === 'right' || swipeDirection === 'left') {
    handleSwipe(swipeDirection);
  } else {
    setCurrentX(0);
    setSwipeDirection(null);
  }
}

const handleSwipe = (direction) => {
  if (direction === 'right') {
    actionHelper('like', likeMovie);
  } else if (direction === 'left') {
    actionHelper('reject', rejectMovie);
  }
  setCurrentX(0);
  setSwipeDirection(null);
}

const handleMouseDown = (e) => {
  e.preventDefault();
  handleDragStart(e);
}

const handleMouseMove = (e) => {
  e.preventDefault();
  handleDragMove(e);
}

const handleMouseUp = (e) => {
  e.preventDefault();
  handleDragEnd();
}

const handleTouchStart = (e) => {
  handleDragStart(e);
}

const handleTouchMove = (e) => {
  e.preventDefault();
  handleDragMove(e);
}

const handleTouchEnd = (e) => {
  e.preventDefault();
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
}, [isDragging, startX, currentX, swipeDirection]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
      <div className="relative rounded-2xl">
        <img className="rounded-2xl border-2 animate-pulse" src="https://dummyimage.com/500x750/020e1a/fff.jpg&text=+" alt="Movie Poster" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center rounded-2xl ">
          <h4 className="text-3xl text-bold animate-pulse">Getting Movies...</h4>
        </div>
        </div>
      </div>
    );
  }

  if (!activeMovie.title) {
    return (
      <div className="max-w-md mx-auto">
        <p>API ERROR: Movie Not Returned</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div ref={cardRef} style={{ transform: `translateX(${currentX}px)` }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} className={`relative rounded-2xl duration-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
        <img className={`rounded-2xl border-2 ${swipeDirection === 'right' ? 'border-green-500 rotate-20' : swipeDirection === 'left' ? 'border-red-500 -rotate-20' : ''} overflow-hidden`} src={activeMovie.poster} alt="Movie Poster" />
        <div className={`flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 rounded-2xl transition-opacity duration-300 ${cardAction === 'like' ? 'bg-green-500/25' : cardAction === 'reject' ? 'bg-red-500/25' : ''}`}>
        {cardAction === 'like' ? <h4 className="text-3xl text-success-900 text-bold">Added To Watch List</h4> : cardAction === 'reject' ? <h4 className="text-3xl text-error-900 text-bold">Rejected!</h4> : null}
        </div>
        <div className={`flex flex-row absolute bottom-0 left-0 right-0 justify-center items-end gap-4 h-full py-4 opacity-0 hover:opacity-100 text-white rounded-2xl `}>
          <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-error-500 " value="no"><PassIcon /></button>
          <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-success-500 " value="yes"><LikeIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
