import { fetchMoviesByGenreId } from "../services/movieService.js";
import { fetchGenres } from "../services/movieService.js";

// fetch movie data with genre ids and enrich with genre names

export const fetchMoviesWithGenres = async (genres, page) => {
    console.log('Fetching movies with genres:', genres, 'on page:', page);
    if (!genres || genres.length === 0) {
        console.warn('No genres provided, returning empty array.');
        return [];
    }
    const [moviesWithGenreIds, allGenres] = await Promise.all([
        fetchMoviesByGenreId(genres, page),
        fetchGenres()
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