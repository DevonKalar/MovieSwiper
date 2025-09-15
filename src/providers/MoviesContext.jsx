import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchMoviesWithGenres } from "../helpers/movieDataHelpers";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
	const [movieQueue, setMovieQueue] = useState([]);
	const [page, setPage] = useState(1);
	const [likedMovies, setLikedMovies] = useState([]);
	const [rejectedMovies, setRejectedMovies] = useState([]);
	const [passedMovies, setPassedMovies] = useState([]);

	console.log('MoviesProvider Mounted!');

	const fetchMoreMovies = useCallback(async () => {
		if (movieQueue.length >= 5) return; // refill when below 5
		const newMovies = await fetchMoviesWithGenres(["878", "53"], page);
		setMovieQueue((prev) => [...prev, ...newMovies]);
		setPage((prev) => prev + 1);
	}, [page]);

	// Initial fetch
	useEffect(() => {
		fetchMoreMovies();
	}, []); 

	const addToQueue = (newMovies) => {
		setMovieQueue((prev) => [...prev, ...newMovies]);
	}

	const removeFromQueue = (movieId) => {
		setMovieQueue((prev) => prev.filter(movie => movie.id !== movieId));
	}

	const likeMovie = (newMovie) => {
			if(likedMovies.some(movie => movie.id === newMovie.id)) return;
			setLikedMovies((prev) => [...prev, newMovie]);
			setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
			setPassedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	const rejectMovie = (newMovie) => {
			if(rejectedMovies.some(movie => movie.id === newMovie.id)) return;
			setRejectedMovies((prev) => [...prev, newMovie]);
			setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
			setPassedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	const passMovie = (newMovie) => {
			if(passedMovies.some(movie => movie.id === newMovie.id)) return;
			setPassedMovies((prev) => [...prev, newMovie]);
	}

	const removeLikedMovie = (newMovie) => {
			setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	return (
			<MoviesContext.Provider value={{
					movieQueue,
					likedMovies,
					rejectedMovies,
					passedMovies,
					addToQueue,
					removeFromQueue,
					likeMovie,
					rejectMovie,
					passMovie,
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