import { createContext, useContext } from 'react';
import type { Movie } from '@/types/movie';

export interface UserContextType {
  likedMovies: Movie[];
  rejectedMovies: Movie[];
  isLoading: boolean;
  error: Error | null;
  likeMovie: (movie: Movie) => Promise<void>;
  rejectMovie: (movie: Movie) => Promise<void>;
  removeLikedMovie: (movie: Movie) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
