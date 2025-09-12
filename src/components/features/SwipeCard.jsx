import { useState, useEffect } from "react";
import { getPersonalizedMovies } from "../../services/movieService.js";
import { useMovies } from "../../providers/MoviesContext.jsx";

const SwipeCard = () => {
  const { likeMovie, rejectMovie, passMovie, movieQueue, removeFromQueue } = useMovies();
  const [activeMovie, setActiveMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieQueue.length > 0) {
      setActiveMovie(movieQueue[0]);
    }
  }, [movieQueue]);

  const handleSubmit = (e) => {
    const buttonValue = e.currentTarget.value;
    switch (buttonValue) {
      case 'yes':
        likeMovie(activeMovie);
        break;
      case 'no':
        rejectMovie(activeMovie);
        break;
      case 'pass':
        passMovie(activeMovie);
        break;
      default:
        // handle unknown
        break;
    }
    //remove movie from queue
    removeFromQueue(activeMovie.id);
  };


  if (!activeMovie.title) {
    return (
      <div className="max-w-md mx-auto">
        <p>API ERROR: Movie Not Returned</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="relative rounded-2xl">
        <img className="rounded-2xl" src={activeMovie.poster} alt="Movie Poster" />
      </div>
      <div className="flex flex-row justify-center gap-4 py-4">
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="no">Nope</button>
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="pass">Pass</button>
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="yes">Yeah</button>
      </div>
    </div>
  );
};

export default SwipeCard;
