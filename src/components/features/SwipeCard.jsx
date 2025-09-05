import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../services/movieService.js";
import { useMovies } from "../../providers/MoviesContext.jsx";

const SwipeCard = () => {

  const getMovieId = () => {
    const newMovieId = Math.floor(Math.random() * 1000);
    console.log("Generated new movie ID:", newMovieId);
    return newMovieId;
  };

  const [movieId, setMovieId] = useState(getMovieId);
  const [movieData, setMovieData] = useState({});

  const getMovieData = async (id) => {
    const data = await fetchMovieDetails(id);
    console.log("Fetched movie data:", data);
    if (data) {
      setMovieData(data);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  const { likeMovie, rejectMovie, passMovie, likedMovies, rejectedMovies, passedMovies } = useMovies();

  const handleSubmit = (e) => {
    const buttonValue = e.currentTarget.value
    switch (buttonValue) {
      case 'yes':
    console.log("User liked the movie:", movieData.title);
    likeMovie(movieData);
    console.log("Current liked movies:", likedMovies);
    break;
      case 'no':
    console.log("User disliked the movie:", movieData.title);
    rejectMovie(movieData);
    console.log("Current disliked movies:", rejectedMovies);
    break;
      case 'pass':
    console.log("User passed on the movie:", movieData.title);
    passMovie(movieData);
    console.log("Current passed movies:", passedMovies);
    break;
      default:
    console.log("Unknown button value:", buttonValue);
    }
    setMovieId(getMovieId());
  }

  return (
    <div className="max-w-md mx-auto">

      {movieData.title === undefined || movieData.title === null ? <p>no movies dude</p> : 
      <>

      <div className="relative rounded-2xl">
        <img className="rounded-2xl" src={movieData.poster} alt="Movie Poster" />
      </div>

      <div className="flex flex-row justify-center gap-4 py-4">
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="no">Nope</button>
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="pass">Pass</button>
        <button onClick={handleSubmit} className="rounded-full w-16 h-16 bg-transparent border-2 border-white" value="yes">Yeah</button>
      </div>
      
      </>}

    </div>

  );
};

export default SwipeCard;
