import { Movie, RawMovie } from '@/types/movie';

class recommendationsApi {
  private readonly timeout: number;
  private readonly baseUrl: string;

  constructor(backendUrl: string = import.meta.env.VITE_BACKEND_URL) {
    this.timeout = 15000; // 15 second timeout for movie API
    this.baseUrl = `${backendUrl}recommendations`;
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
  async fetchRecommendations(page = 1) {
    const url = `${this.baseUrl}?page=${page}`;
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

    const rawData: { results: RawMovie[] } = await response.json();
    const data: Movie[] = rawData.results.map(movie => ({
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
}

const recommendationsService = new recommendationsApi();
export default recommendationsService;