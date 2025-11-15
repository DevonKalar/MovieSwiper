import { createContext, useContext } from 'react';

export const MovieFeedContext = createContext();

const useMovieFeed = () => {
  const context = useContext(MovieFeedContext);
  if (!context) {
    throw new Error('useMovieFeed must be used within a MovieFeedProvider');
  }
  return context;
}

export default useMovieFeed;