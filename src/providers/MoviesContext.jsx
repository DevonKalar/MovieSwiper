import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchMoviesWithGenres } from "../helpers/movieDataHelpers";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
	const [movieQueue, setMovieQueue] = useState([]);
	const [page, setPage] = useState(1);
	const [likedMovies, setLikedMovies] = useState([]);
	const [rejectedMovies, setRejectedMovies] = useState([]);

	// fetch more movies function
	const fetchMoreMovies = useCallback(async () => {
		if (movieQueue.length >= 5) return; // only fetch if queue has less than 5 movies
		const newMovies = await fetchMoviesWithGenres(["878", "53"], page);
		setMovieQueue((prev) => [...prev, ...newMovies]);
		setPage((prev) => prev + 1);
	}, [movieQueue.length, page]);

	// movie queue refill effect
	useEffect(() => {
		fetchMoreMovies();
	}, [movieQueue.length, fetchMoreMovies]); 

	// movie action handlers
	const removeFromQueue = (movieId) => {
		setMovieQueue((prev) => prev.filter(movie => movie.id !== movieId));
	}

	const likeMovie = (newMovie) => {
		if(likedMovies.some(movie => movie.id === newMovie.id)) return;
		setLikedMovies((prev) => [...prev, newMovie]);
		setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
		removeFromQueue(newMovie.id);
	}

	const rejectMovie = (newMovie) => {
		if(rejectedMovies.some(movie => movie.id === newMovie.id)) return;
		setRejectedMovies((prev) => [...prev, newMovie]);
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
		removeFromQueue(newMovie.id);
	}

	const removeLikedMovie = (newMovie) => {
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	return (
		<MoviesContext.Provider value={{
			movieQueue,
			likedMovies,
			rejectedMovies,
			likeMovie,
			rejectMovie,
			removeLikedMovie
		}}>
				{children}
		</MoviesContext.Provider>
	)
};

const useMovies = () => {
	const context = useContext(MoviesContext);

	if(!context) {
			throw new Error('useMovies must be used within a MoviesProvider');
	}

	return context;
}

export { MoviesProvider, useMovies };