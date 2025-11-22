import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import useAuth from './AuthContext'
import watchlistService from "@/services/watchlist";

// going to be watchlist provider

const UserProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState([]);
	const [rejectedMovies, setRejectedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const loadWatchlist = async () => {
    setIsLoading(true);
    setError(null);
    try { 
      const rawData = await watchlistService.getWatchlist();
      const watchlist = rawData.watchlist.map(item => item.movie);
      setLikedMovies(watchlist);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    if(isAuthenticated){
      loadWatchlist();
    } else {
      setLikedMovies([]);
    }
  }, [isAuthenticated]);

	const likeMovie = async (newMovie) => {
		if(likedMovies.some(movie => movie.id === newMovie.id)) return;
		
		// Store previous state for rollback
		const previousLikedMovies = likedMovies;
		
		// Optimistic update - apply immediately
		setLikedMovies((prev) => [...prev, newMovie]);
		setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
		
		try {
			await watchlistService.addToWatchlist(newMovie);
		} catch (error) {
			// Rollback on error
			setLikedMovies(previousLikedMovies);
			console.error("Failed to add movie to watchlist:", error);
			// set state for error in UI
			setError(error.message || "Failed to add movie to watchlist");
		}
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