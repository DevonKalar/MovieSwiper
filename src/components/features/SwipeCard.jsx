import React from "react";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../services/movieService.js";

const SwipeCard = () => {
  const [movieId, setMovieId] = useState(273);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    poster: "",
  });


  useEffect(() => {
    console.log("useEffect Ran!");
    const fetchData = async () => {
      if (movieId) {
        const data = await fetchMovieDetails(movieId);
        console.log("Fetched movie data:", data);
        if (data) {
          setMovieData(data);
        }
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      <div className="swipe-card">
        <div className="image-container">
          <img src={movieData.poster} alt="Movie Poster" />
          <div className="movie-info">
            <h3>{movieData.title}</h3>
            <p>{movieData.description}</p>
          </div>
        </div>
        <div>
            <p>more info</p>
        </div>
      </div>
      <div className="AnswerWrapper">
        <button className="swipe-button">Nope</button>
        <button className="swipe-button">Pass</button>
        <button className="swipe-button">Yeah</button>
      </div>
    </>
  );
};

export default SwipeCard;
