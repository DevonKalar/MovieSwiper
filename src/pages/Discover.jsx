import { useEffect, useState } from "react";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import DiscoverCard from "@components/DiscoverCard";
import { useUser } from "@providers/UserProvider.jsx";
import { fetchMoviesWithGenres } from "@helpers/movieDataHelpers";
import { useMinimumLoading } from "@hooks/useMinimumLoading.js";

const Discover = () => {
	const [movies, setMovies] = useState([]);
	const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
	const { isLoading, startLoading, stopLoading } = useMinimumLoading(300);
	const { likeMovie, rejectMovie, queryPage, setQueryPage, likedMovies, rejectedMovies } = useUser();

	// load movies
	useEffect(() => {
		loadMovies();
	}, [queryPage]);
	
	const loadMovies = async () => {
		startLoading();
		console.log(`loading movies for page ${queryPage}...`);
		const fetchedMovies = await fetchMoviesWithGenres(["878", "53"], queryPage);
		const newMovies = fetchedMovies.filter(movie => !likedMovies.some(liked => liked.id === movie.id) && !rejectedMovies.some(rejected => rejected.id === movie.id));
		const remainingMovies = movies.slice(currentMovieIndex + 1);
		setMovies([...remainingMovies, ...newMovies]);
		setCurrentMovieIndex(0);
		stopLoading();
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
      <Header />
      <main className="flex-1 overflow-hidden py-12 relative">
        {movies.slice(currentMovieIndex, currentMovieIndex + 3).reverse().map(movie => (
					<DiscoverCard key={movie.id} movie={movie} onSwipe={handleSwipe} isLoading={isLoading} />
					))
				}
      </main>
      <Footer />
    </>
  );
};

export default Discover;
