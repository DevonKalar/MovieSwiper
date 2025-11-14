import movieService from '@services/movies';

// fetch movie data with genre ids and enrich with genre names
export const fetchMoviesWithGenres = async (genres, page) => {
  if (!genres || genres.length === 0) {
    console.warn('No genres provided, returning empty array.');
    return [];
  }
  const [moviesWithGenreIds, allGenres] = await Promise.all([
    movieService.fetchMoviesByGenreId(genres, page),
    movieService.fetchGenres()
  ]);
  const genreMap = allGenres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});
  return moviesWithGenreIds.map(movie => ({
    ...movie,
    genreNames: movie.genreIds.map(id => genreMap[id] || "Unknown"),
  }));
}