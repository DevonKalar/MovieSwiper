
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../services/movieService.js";
import { useMovies } from "../../providers/MoviesContext.jsx";

const SwipeCard = () => {

  const randomMovieId = () => Math.floor(Math.random() * 1000);
  const [movieId, setMovieId] = useState(randomMovieId);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovieData(data || {});
    };
    fetchData();
  }, [movieId]);

  const { likeMovie, rejectMovie, passMovie } = useMovies();


  const handleSubmit = (e) => {
    const buttonValue = e.currentTarget.value;
    switch (buttonValue) {
      case 'yes':
        likeMovie(movieData);
        break;
      case 'no':
        rejectMovie(movieData);
        break;
      case 'pass':
        passMovie(movieData);
        break;
      default:
        // handle unknown
        break;
    }
    setMovieId(randomMovieId());
  };


  if (!movieData.title) {
    return (
      <div className="max-w-md mx-auto">
        <p>no movies dude</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="relative rounded-2xl">
        <img className="rounded-2xl" src={movieData.poster} alt="Movie Poster" />
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
