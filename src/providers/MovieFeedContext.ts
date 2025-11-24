import { createContext, useContext } from 'react';
import type { Movie } from '@/types/movie';

export interface MovieFeedContextType {
  movieQueue: Movie[];
  feedPosition: number;
  isLoading: boolean;
  error: Error | null;
  moveToNext: () => void;
}

export const MovieFeedContext = createContext<MovieFeedContextType | undefined>(undefined);

const useMovieFeed = () => {
  const context = useContext(MovieFeedContext);
  if (!context) {
    throw new Error('useMovieFeed must be used within a MovieFeedProvider');
  }
  return context;
}

export default useMovieFeed;