import { useEffect, useState } from "react";
import { fetchMoviesWithGenres } from "@helpers/movieDataHelpers";
import { useMinimumLoading } from "@hooks/useMinimumLoading.js";

/**
 * Custom hook for managing movie discovery logic
 * Handles fetching, filtering, pagination, and navigation
 * 
 * param {Array<string>} genres - Genre IDs to fetch
 * param {Array} likedMovies - Movies the user has liked
 * param {Array} rejectedMovies - Movies the user has rejected
 * returns {object} - Movie state and navigation functions
 */

export const useMovieDiscovery = (genres, likedMovies, rejectedMovies) => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [queryPage, setQueryPage] = useState(1);
  const [error, setError] = useState(null);
  const { isLoading, startLoading, stopLoading } = useMinimumLoading(300);

  const loadMovies = async () => {
    startLoading();
    try {
      const fetchedMovies = await fetchMoviesWithGenres(genres, queryPage);

      if (fetchedMovies.length === 0) {
        console.warn('No movies fetched from fetchMoviesWithGenres.');
        setError('No movies available at the moment. Please try again later.');
        stopLoading();
        return;
      }

      // Filter out already liked/rejected movies
      const newMovies = fetchedMovies.filter(
        movie => !likedMovies.some(liked => liked.id === movie.id) 
          && !rejectedMovies.some(rejected => rejected.id === movie.id)
      );
      
      const remainingMovies = movies.slice(currentMovieIndex + 1);
      setMovies([...remainingMovies, ...newMovies]);
      setCurrentMovieIndex(0);

    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(error.message || 'Failed to load movies. Please try again later.');
    } finally {
      stopLoading();
    }
  };

  const moveToNext = () => {
    if (currentMovieIndex < movies.length - 1) {
      setCurrentMovieIndex(prevIndex => prevIndex + 1);
    } else {
      setQueryPage(prevPage => prevPage + 1);
    }
  };

  const getCurrentMovie = () => movies[currentMovieIndex];

  const getVisibleMovies = (count = 3) => 
    movies.slice(currentMovieIndex, currentMovieIndex + count);

  useEffect(() => {
    loadMovies();
  }, [queryPage]);

  return {
    movies,
    currentMovie: getCurrentMovie(),
    visibleMovies: getVisibleMovies(),
    isLoading,
    error,
    moveToNext,
  };
};
