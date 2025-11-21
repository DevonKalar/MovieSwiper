const baseURL = import.meta.env.VITE_BACKEND_URL;

//

class recommendationsApi {
  constructor() {
    this.timeout = 15000; // 15 second timeout for movie API
  }

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server did not respond in time');
      }
      throw error;
    }
  }

  // fetches movie recommendations, if no preferred genres provided, backend will handle defaults
  async fetchRecommendations(page = 1) {
    const url = `${baseURL}recommendations?page=${page}`;
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

    const data = await response.json();
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_names,
    }));
  }
}

const recommendationsService = new recommendationsApi();
export default recommendationsService;