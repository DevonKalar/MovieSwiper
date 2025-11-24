import { useState, useEffect } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import useAuth from './AuthContext'
import watchlistService from "@/services/watchlist";
import type { Movie } from "@/types/movie";
import type { ProviderProps } from '@/types/provider';

const UserProvider = ({ children }: ProviderProps) => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
	const [rejectedMovies, setRejectedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth();

  async function loadWatchlist(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try { 
      const rawData = await watchlistService.getWatchlist();
      const watchlist = rawData.watchlist.map((item: { movie: Movie }) => item.movie);
      setLikedMovies(watchlist);
    } catch (error) {
      console.error('Error loading watchlist:', error);
      const err = error instanceof Error ? error : new Error('Failed to load watchlist');
      setError(err);
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

	async function likeMovie(newMovie: Movie): Promise<void> {
		if(likedMovies.some(movie => movie.id === newMovie.id)) return;
		
		const previousLikedMovies = likedMovies;
		const previousRejectedMovies = rejectedMovies;
		
		setLikedMovies((prev) => [...prev, newMovie]);
		setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
		
		try {
			await watchlistService.addToWatchlist(newMovie);
		} catch (error) {
			console.error("Failed to add movie to watchlist:", error);
      const err = error instanceof Error ? error : new Error('Failed to add movie to watchlist');
			setLikedMovies(previousLikedMovies);
			setRejectedMovies(previousRejectedMovies);
			setError(err);
		}
	}

	async function rejectMovie(newMovie: Movie): Promise<void> {
		if(rejectedMovies.some(movie => movie.id === newMovie.id)) return;
		setRejectedMovies((prev) => [...prev, newMovie]);
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

	const removeLikedMovie = (newMovie: Movie): void => {
		setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
	}

  const value: UserContextType = {
    likedMovies,
    rejectedMovies,
    isLoading,
    error,
    likeMovie,
    rejectMovie,
    removeLikedMovie,

  }
	return (
		<UserContext.Provider value={value}>
				{children}
		</UserContext.Provider>
	)

}

export default UserProvider;