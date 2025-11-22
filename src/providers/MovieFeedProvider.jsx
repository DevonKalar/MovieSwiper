import { MovieFeedContext } from "./MovieFeedContext";
import { useUser } from "./UserContext";
import useAuth from './AuthContext'
import { useState, useEffect } from "react";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";
import fetchRecommendations from "@/services/recommendations";

const MovieFeedProvider = ({ children }) => {
  const [movieQueue, setMovieQueue] = useState([]);
  const [feedPosition, setFeedPosition] = useState(0);
  const [queryPage, setQueryPage] = useState(1);
  const { isLoading, startLoading, stopLoading } = useMinimumLoading(300);
  const [error, setError] = useState(null);
  const { likedMovies } = useUser();
  const { isAuthenticated } = useAuth();

  const loadMovies = async () => {
    startLoading();
    try {
      const fetchedMovies = await fetchRecommendations.fetchRecommendations(queryPage);

      if (fetchedMovies.length === 0) {
        console.warn('No movies fetched from fetchMoviesWithGenres.');
        setError('No movies available at the moment. Please try again later.');
        stopLoading();
        return;
      }

      // Filter out movies already in watchlist
      const newMovies = fetchedMovies.filter(
        movie => !likedMovies.some(liked => liked.id === movie.id) 
      );
      
      const remainingMovies = movieQueue.slice(feedPosition + 1);
      setMovieQueue([...remainingMovies, ...newMovies]);
      setFeedPosition(0);

    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(error.message || 'Failed to load movies. Please try again later.');
    } finally {
      stopLoading();
    }
  };

  const moveToNext = () => {
    if (feedPosition < movieQueue.length - 1) {
      setFeedPosition(prevIndex => prevIndex + 1);
    } else {
      setQueryPage(prevPage => prevPage + 1);
    }
    
  };

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPage, isAuthenticated]);

  return (
    <MovieFeedContext.Provider value={{ 
      movieQueue,
      feedPosition,
      isLoading,
      error,
      moveToNext
    }}>
      {children}
    </MovieFeedContext.Provider>
  );
}

export default MovieFeedProvider;