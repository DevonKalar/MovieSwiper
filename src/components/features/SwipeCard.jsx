import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../services/movieService.js";

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

  const handleSubmit = (e) => {
    const buttonValue = e.currentTarget.value
    switch (buttonValue) {
      case 'yes':
    console.log("User liked the movie:", movieData.title);
    break;
      case 'no':
    console.log("User disliked the movie:", movieData.title);
    break;
      case 'pass':
    console.log("User passed on the movie:", movieData.title);
    break;
      default:
    console.log("Unknown button value:", buttonValue);
    }
    setMovieId(getMovieId());
  }

  return (
    <div className="swipe-card-box">
      <div className="swipe-card">
        <div className="image-container">
          <img src={movieData.poster} alt="Movie Poster" />
          <div className="movie-info">
            <h3>{movieData.title}</h3>
            <p>{movieData.description}</p>
          </div>
        </div>
      </div>
      <div className="AnswerWrapper">
        <button onClick={handleSubmit} className="swipe-button" value="no">Nope</button>
        <button onClick={handleSubmit} className="swipe-button" value="pass">Pass</button>
        <button onClick={handleSubmit} className="swipe-button" value="yes">Yeah</button>
      </div>
    </div>
  );
};

export default SwipeCard;
