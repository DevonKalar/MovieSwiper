import { useState, useEffect } from "react";
import { useMovies } from "@providers/MoviesContext.jsx";
import { LikeIcon } from '@icons/exports.jsx';
import { PassIcon } from '@icons/exports.jsx';

const SwipeCard = () => {
  const { likeMovie, rejectMovie, movieQueue } = useMovies();
  const [activeMovie, setActiveMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardAction, setCardAction] = useState(null); // 'like' or 'reject'

  useEffect(() => {
    if (movieQueue.length > 0) {
      setActiveMovie(movieQueue[0]);
    }
  }, [movieQueue]);

const actionHelper = (action, actionFunction) => {
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

  if (!activeMovie.title) {
    return (
      <div className="max-w-md mx-auto">
        <p>API ERROR: Movie Not Returned</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className={`relative rounded-2xl ${cardAction === 'like' ? 'bg-green-500' : cardAction === 'reject' ? 'bg-red-500' : ''}`}>
        <img className={`rounded-2xl border-2 ${cardAction === 'like' ? 'border-green-500 bg-green-500' : cardAction === 'reject' ? 'border-red-500 bg-red-500' : ''} overflow-hidden`} src={activeMovie.poster} alt="Movie Poster" />
        <div className="flex flex-row absolute bottom-0 left-0 right-0 justify-center gap-4 py-4 opacity-0 hover:opacity-100 text-white rounded-b-2xl">
          <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-error-500 " value="no"><PassIcon /></button>
          <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-success-500 " value="yes"><LikeIcon /></button>
        </div>
      </div>
      
    </div>
  );
};

export default SwipeCard;
