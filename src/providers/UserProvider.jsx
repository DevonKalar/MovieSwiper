import { createContext, useContext, useState } from "react";

/**
 * Centralized state provider for demo simplicity.
 * 
 * This provider currently combines three domains:
 * 
 * 1. AUTH DOMAIN - User authentication and profile data
 *    - isLoggedIn, firstName, lastName
 *    - Future: Would extract to AuthProvider with user sessions, profile management, and preferences
 * 
 * 2. WATCHLIST DOMAIN - User's saved movies  
 *    - likedMovies, likeMovie, removeLikedMovie
 *    - Future: Would extract to WatchlistProvider with persistence, sharing features, notes, watch status, etc
 * 
 * 3. RECOMMENDATIONS DOMAIN - Movie discovery and pagination state
 *    - rejectedMovies, queryPage (for filtering and fetching)
 *    - Future: Would hold Recommendations queue and extract to RecommendationsProvider with algorithm customization
 * 
 * PRODUCTION SCALING:
 * Each domain would become a separate provider with composition:
 * <AuthProvider><WatchlistProvider><RecommendationsProvider><App /></...></...></...>
 * Or use a state management solution like Redux or Zustand for complex inter-domain interactions.
 * 
 * This allows independent testing, clearer boundaries, and prevents unnecessary re-renders
 * when unrelated domain state changes.
 */

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [likedMovies, setLikedMovies] = useState([]);
	const [rejectedMovies, setRejectedMovies] = useState([]);
	const [queryPage, setQueryPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('');

	const likeMovie = (newMovie) => {
		if(likedMovies.some(movie => movie.id === newMovie.id)) return;
		setLikedMovies((prev) => [...prev, newMovie]);
		setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
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
			queryPage,
			setQueryPage,
      isLoggedIn,
      setIsLoggedIn,
      firstName,
      lastName,
      setFirstName,
      setLastName
		}}>
				{children}
		</UserContext.Provider>
	)
};

const useUser = () => {
	const context = useContext(UserContext);

	if(!context) {
			throw new Error('useUser must be used within a UserProvider');
	}

	return context;
}

export { UserProvider, useUser };