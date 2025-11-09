import { useEffect, useState, useRef } from "react";
import DiscoverCard from "@components/discover/DiscoverCard";
import { useUser } from "@providers/UserProvider.jsx";
import { fetchMoviesWithGenres } from "@helpers/movieDataHelpers";
import { useMinimumLoading } from "@hooks/useMinimumLoading.js";

const Discover = () => {
	const [movies, setMovies] = useState([]);
	const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
	const { isLoading, startLoading, stopLoading } = useMinimumLoading(300);
	const { likeMovie, rejectMovie, queryPage, setQueryPage, likedMovies, rejectedMovies } = useUser();
  const [ error, setError ] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const mainRef = useRef(null);

	// load movies
	useEffect(() => {
		loadMovies();
	}, [queryPage]);
	
	const loadMovies = async () => {
  startLoading();
    try {
      const fetchedMovies = await fetchMoviesWithGenres(["878", "53"], queryPage);

      if (fetchedMovies.length === 0) {
        console.warn('No movies fetched from fetchMoviesWithGenres.');
        setError('No movies available at the moment. Please try again later.');
        stopLoading();
        return;
      }

      const newMovies = fetchedMovies.filter(movie => !likedMovies.some(liked => liked.id === movie.id) && !rejectedMovies.some(rejected => rejected.id === movie.id));
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

	// handle swipe
	const handleSwipe = (direction) => {
    const currentMovie = movies[currentMovieIndex];
    
		if (direction === 'right') {
			likeMovie(currentMovie);
      setAnnouncement(`${currentMovie.title} added to watchlist`);
		} else if (direction === 'left') {
			rejectMovie(currentMovie);
      setAnnouncement(`Passed on ${currentMovie.title}`);
		}

		if (currentMovieIndex < movies.length - 1) {
			setCurrentMovieIndex(prevIndex => prevIndex + 1);
		} else {
			setQueryPage(prevPage => prevPage + 1);
		}

    // Maintain focus on the main container
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.focus();
      }
    }, 100);
	};

  return (
    <>
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>
      <main 
        ref={mainRef}
        tabIndex="-1"
        className="flex-1 overflow-x-hidden overflow-y-auto py-12 relative"
        aria-label="Movie discovery area"
      >
        <div className="wrapper max-w-md mx-auto p-2 relative">
          {movies.slice(currentMovieIndex, currentMovieIndex + 3).map((movie, index) => (
            <DiscoverCard 
              key={movie.id} 
              movie={movie} 
              onSwipe={handleSwipe} 
              isLoading={isLoading} 
              style={{ zIndex: 3 - index }}
              isTopCard={index === 0}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Discover;
