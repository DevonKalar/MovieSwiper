import { useEffect, useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
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
		setMovies(fetchedMovies.filter(movie => !likedMovies.some(liked => liked.id === movie.id) && !rejectedMovies.some(rejected => rejected.id === movie.id)));
		setIsLoading(false);
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
			console.log(`on page ${queryPage}, loading more movies...`);
			setQueryPage(prevPage => prevPage + 1);
			setCurrentMovieIndex(0);
		}
	};

	  if (isLoading) {
    return (
			<>
			<Header />
      	<main className="flex-1 overflow-hidden py-12">
					<div className="max-w-md mx-auto p-4">
						<div className="relative rounded-2xl">
							<img className="rounded-2xl border-2 animate-pulse" src="https://dummyimage.com/500x750/020e1a/fff.jpg&text=+" alt="Movie Poster" />
							<div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center rounded-2xl ">
          		<h4 className="text-3xl text-bold animate-pulse">Getting Movies...</h4>
        			</div>
        			</div>
      		</div>
			</main>
			<Footer />
			</>
    );
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden py-12">
        { movies.slice(currentMovieIndex, currentMovieIndex + 1).map(movie => (
					<DiscoverCard key={movie.id} movie={movie} onSwipe={handleSwipe} isTop={currentMovieIndex === 0} />
					))
				}
      </main>
      <Footer />
    </>
  );
};

export default Discover;
