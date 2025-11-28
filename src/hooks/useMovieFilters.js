import { useState, useMemo } from "react";

/**
 * Custom hook to manage movie filtering logic
 * 
 * param {Array} movies - Array of movie objects to filter
 * returns {Object} - Filter state, filtered movies, and filter management functions
 */

export const useMovieFilters = (movies) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    genre: [],
    decade: [],
    rating: { min: 1, max: 10},
  });

  const availableGenres = useMemo(() => {
    const genresSet = new Set();
    movies.forEach(movie => {
      movie.genres?.forEach(genre => genresSet.add(genre));
    });
    return Array.from(genresSet).sort();
  }, [movies]);

  const availableDecades = useMemo(() => {
    const decadesSet = new Set();
    movies.forEach(movie => {
      if (movie.releaseDate) {
        const decade = Math.floor(parseInt(movie.releaseDate.split("-")[0]) / 10) * 10;
        decadesSet.add(decade);
      }
    });
    return Array.from(decadesSet).sort((a, b) => a - b);
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (!movie.title) return false;
      // Check search term
      const matchesSearch = !filters.searchTerm || 
        movie.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Check genres
      const matchesGenre = filters.genre.length === 0 || 
        filters.genre.every(genre => movie.genres?.includes(genre));
      
      // Check decades
      const matchesDecade = filters.decade.length === 0 || 
        (movie.releaseDate && filters.decade.includes(
          Math.floor(parseInt(movie.releaseDate.split("-")[0]) / 10) * 10
        ));
      
      // Check rating range - show all if min is 1 and max is 10
      const matchesRating = (filters.rating.min == 1 && filters.rating.max == 10)
        ? true
        : movie.ratings >= filters.rating.min && movie.ratings <= filters.rating.max;
      
      return matchesSearch && matchesGenre && matchesDecade && matchesRating;
    });
  }, [movies, filters]);

  const addFilter = (category, value) => {
    setFilters(prev => {
      const updated = { ...prev };
      
      if (category === 'rating') {
        // For rating, replace the entire range object
        updated[category] = value;
      } else if (category === 'searchTerm') {
        // For search term, replace the string value
        updated[category] = value;
      } else {
        // For arrays (genre, decade), toggle the value
        const currentValues = prev[category] || [];
        if (currentValues.includes(value)) {
          // Remove if already present (toggle off)
          updated[category] = currentValues.filter(v => v !== value);
        } else {
          // Add if not present (toggle on)
          updated[category] = [...currentValues, value];
        }
      }
      
      return updated;
    });
  };

  const removeFilter = (category, value) => {
    console.log('Removing filter:', category, value);
    setFilters(prev => {
      const updated = { ...prev };
      if (category === 'rating') {
        updated[category] = { min: 1, max: 10 };
      } else {
        updated[category] = prev[category].filter(v => v !== value);
      }
      return updated;
    });
  };

  return {
    filters,
    filteredMovies,
    availableGenres,
    availableDecades,
    addFilter,
    removeFilter
  };
};

export default useMovieFilters;
