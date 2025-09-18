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
      <div className={`relative rounded-2xl `}>
        <img className={`rounded-2xl border-2 ${cardAction === 'like' ? 'border-green-500 bg-green-500' : cardAction === 'reject' ? 'border-red-500 bg-red-500' : ''} overflow-hidden`} src={activeMovie.poster} alt="Movie Poster" />
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
