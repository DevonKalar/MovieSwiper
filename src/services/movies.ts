const baseURL = import.meta.env.VITE_BACKEND_URL;
import type { Movie, RawMovie } from "@/types/movie";

class tmdbApi {
  private readonly timeout: number;
  private readonly baseUrl: string;
  
  constructor(backendUrl: string = import.meta.env.VITE_BACKEND_URL) {
    this.timeout = 15000; // 15 second timeout for movie API
    this.baseUrl = `${backendUrl}tmdb/`;
  }

  async fetchWithTimeout(url: string, options: RequestInit = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Network error');
      if (err.name === 'AbortError') {
        throw new Error('Request timeout - server did not respond in time');
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // fetches movie recommendations, if no preferred genres provided, backend will handle defaults
  async fetchRecommendations(page = 1, genres: string[] = []) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    
    if (genres && genres.length > 0) {
      params.append('genres', genres.join(','));
    }
    
    const url = `${this.baseUrl}recommendations?${params.toString()}`;
    console.log(`[fetchRecommendations] Fetching from URL: ${url}`);
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TMDB API Error: ${errorText}`);
    }

    const rawData: RawMovie[] = await response.json();
    const data: Movie[] = rawData.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_names,
    }));

    return data;
  }

  async fetchMoviesByGenreId(genres = ["Action", "Thriller"], page = 1) {
    const genreParam = genres.join(',');
    const genreString = `genres=${encodeURIComponent(genreParam)}`;
    const url = `${baseURL}tmdb/movies?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&${genreString}`;
    
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    const rawData = await response.json();
    const data = rawData.results.map((movie: RawMovie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genreIds: movie.genre_ids,
    }));
    
    return data;
  }

  async fetchMovieDetails(movieId: number) {
    const url = `${baseURL}tmdb/movies/${movieId}?language=en-US`;
    
    const response = await this.fetchWithTimeout(url, {
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      description: data.overview,
      companies: data.production_companies?.map((company: { name: string }) => company.name) || "Unknown",
      genreIds: data.genres?.map((genre: { name: string }) => genre.name) || "Unknown",
      releaseDate: data.release_date,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    };
  }

  async fetchGenres() {
    const url = `${baseURL}tmdb/genres`;
    
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  }

  async fetchPopularMovies(page = 1) {
    const url = `${baseURL}tmdb/popular?language=en-US&page=${page}`;
    
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    const rawData = await response.json();
    const data: Movie[] = rawData.results.map((movie: RawMovie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      releaseYear: movie.release_date ? movie.release_date.split("-")[0] : "Unknown",
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      rating: movie.vote_average,
      genreIds: movie.genre_ids, // Note: genre_ids are numeric IDs; mapping to names requires additional data
    }));
    return data
  }
}

const movieService = new tmdbApi();
export default movieService;