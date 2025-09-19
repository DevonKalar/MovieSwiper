const baseURL = import.meta.env.VITE_BACKEND_URL;

class tmdbApiService {
  async fetchMoviesByGenreId(genres = ["878", "53"], page = 1) {
    const genreString = genres.join("%7C");
    const url = `${baseURL}tmdb/movies?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreString}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
        genreIds: movie.genre_ids,
      }));
    } catch (error) {
      console.error("Fetch movies failed:", error);
      return [];
    }
  }

  async fetchMovieDetails(movieId) {
    const url = `${baseURL}tmdb/movies/${movieId}?language=en-US`;
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return {
        id: data.id,
        title: data.title,
        description: data.overview,
        companies: data.production_companies?.map(company => company.name) || "Unknown",
        genreIds: data.genres?.map(genre => genre.name) || "Unknown",
        releaseDate: data.release_date,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      };
    } catch (error) {
      console.error("Fetch movie details failed:", error);
      return null;
    }
  }

  async fetchGenres() {
    const url = `${baseURL}tmdb/genres`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch genres failed:", error);
      return [];
    }
  }

  async fetchPopularMovies(page = 1) {
    const url = `${baseURL}tmdb/popular?language=en-US&page=${page}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date,
        releaseYear: movie.release_date ? movie.release_date.split("-")[0] : "Unknown",
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
        genreIds: movie.genre_ids, // Note: genre_ids are numeric IDs; mapping to names requires additional data
      }));
    } catch (error) {
      console.error("Fetch popular movies failed:", error);
      return [];
    }
  }
}

const tmdbApi = new tmdbApiService();
export default tmdbApi;