import { createContext, useContext } from 'react';
import type { Movie } from '@/types/movie';

export interface WatchlistContextType {
  likedMovies: Movie[];
  rejectedMovies: Movie[];
  isLoading: boolean;
  error: Error | null;
  likeMovie: (movie: Movie) => Promise<void>;
  rejectMovie: (movie: Movie) => Promise<void>;
  removeLikedMovie: (movie: Movie) => void;
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
