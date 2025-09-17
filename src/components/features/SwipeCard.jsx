import { useState, useEffect } from "react";
import { useMovies } from "../../providers/MoviesContext.jsx";

const SwipeCard = () => {
  const { likeMovie, rejectMovie, passMovie, movieQueue, removeFromQueue } = useMovies();
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
    case 'pass':
      actionHelper('pass', passMovie);
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
      <div className="relative rounded-2xl" >
        <img className={`rounded-2xl border-2 ${cardAction === 'like' ? 'border-green-500' : cardAction === 'reject' ? 'border-red-500' : ''} overflow-hidden`} src={activeMovie.poster} alt="Movie Poster" />
      </div>
      <div className="flex flex-row justify-center gap-4 py-4">
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="no">Nope</button>
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="yes">Yeah</button>
      </div>
    </div>
  );
};

export default SwipeCard;
