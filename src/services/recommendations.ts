import { Movie } from '@/types/movie';

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

    const data: { results: Movie[] } = await response.json();
    return data;
  }
}

const recommendationsService = new recommendationsApi();
export default recommendationsService;