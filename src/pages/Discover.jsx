import { useEffect, useState } from "react";
import DiscoverCard from "@components/DiscoverCard";
import { useUser } from "@providers/UserProvider.jsx";
import { fetchMoviesWithGenres } from "@helpers/movieDataHelpers";
import { useMinimumLoading } from "@hooks/useMinimumLoading.js";

const Discover = () => {
	const [movies, setMovies] = useState([]);
	const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
	const { isLoading, startLoading, stopLoading } = useMinimumLoading(300);
	const { likeMovie, rejectMovie, queryPage, setQueryPage, likedMovies, rejectedMovies } = useUser();
  const [ error, setError ] = useState(null);

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
		if (direction === 'right') {
			likeMovie(movies[currentMovieIndex]);
		} else if (direction === 'left') {
			rejectMovie(movies[currentMovieIndex]);
		}

		if (currentMovieIndex < movies.length - 1) {
			setCurrentMovieIndex(prevIndex => prevIndex + 1);
		} else {
			setQueryPage(prevPage => prevPage + 1);
		}
	};

  return (
    <>
      <main className="flex-1 overflow-hidden py-12 relative">
        {movies.slice(currentMovieIndex, currentMovieIndex + 3).reverse().map(movie => (
					<DiscoverCard key={movie.id} movie={movie} onSwipe={handleSwipe} isLoading={isLoading} />
					))
				}
      </main>
    </>
  );
};

export default Discover;
