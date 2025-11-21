import { useState } from "react";
import { UserContext } from "./UserContext";
import watchlistService from "@/services/watchlist";

// going to be watchlist provider

const UserProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState([]);
	const [rejectedMovies, setRejectedMovies] = useState([]);

	const likeMovie = (newMovie) => {
		if(likedMovies.some(movie => movie.id === newMovie.id)) return;
		setLikedMovies((prev) => [...prev, newMovie]);
		setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
    watchlistService.addToWatchlist(newMovie).catch((error) => {
      console.error("Failed to add movie to watchlist:", error);
    });
	}

	const rejectMovie = (newMovie) => {
		if(rejectedMovies.some(movie => movie.id === newMovie.id)) return;
		setRejectedMovies((prev) => [...prev, newMovie]);
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	const removeLikedMovie = (newMovie) => {
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	return (
		<UserContext.Provider value={{
			likedMovies,
			rejectedMovies,
			likeMovie,
			rejectMovie,
			removeLikedMovie,
		}}>
				{children}
		</UserContext.Provider>
	)

}

export default UserProvider;