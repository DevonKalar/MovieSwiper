import { useEffect, useState } from "react";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import DiscoverCard from "@components/DiscoverCard";
import { useUser } from "@providers/UserProvider.jsx";
import { fetchMoviesWithGenres } from "@helpers/movieDataHelpers";

const Discover = () => {
	const [movies, setMovies] = useState([]);
	const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { likeMovie, rejectMovie, queryPage, setQueryPage, likedMovies, rejectedMovies } = useUser();

	// load movies
	useEffect(() => {
		loadMovies();
	}, [queryPage]);
	
	const loadMovies = async () => {
		setIsLoading(true);
		console.log(`loading movies for page ${queryPage}...`);
		const fetchedMovies = await fetchMoviesWithGenres(["878", "53"], queryPage);
		const newMovies = fetchedMovies.filter(movie => !likedMovies.some(liked => liked.id === movie.id) && !rejectedMovies.some(rejected => rejected.id === movie.id));
		const remainingMovies = movies.slice(currentMovieIndex + 1);
		setMovies([...remainingMovies, ...newMovies]);
		setIsLoading(false);
		setCurrentMovieIndex(0);
	};

	// handle swipe
	const handleSwipe = (direction) => {
		if (direction === 'right') {
			likeMovie(movies[currentMovieIndex]);
		} else if (direction === 'left') {
			rejectMovie(movies[currentMovieIndex]);
		}

		if (currentMovieIndex < movies.length - 3) {
			setCurrentMovieIndex(prevIndex => prevIndex + 1);
		} else {
			setQueryPage(prevPage => prevPage + 1);
		}
	};

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden py-12 relative">
        { movies.slice(currentMovieIndex, currentMovieIndex + 3).reverse().map(movie => (
					<DiscoverCard key={movie.id} movie={movie} onSwipe={handleSwipe} isTop={currentMovieIndex === 0} isLoading={isLoading} />
					))
				}
      </main>
      <Footer />
    </>
  );
};

export default Discover;
