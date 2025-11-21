const baseURL = import.meta.env.VITE_BACKEND_URL;

class watchlistApi {
  constructor() {
    this.timeout = 10000; // 10 second timeout for watchlist API
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

  // adds a movie to the user's watchlist
  async addToWatchlist(movie) {
    const url = `${baseURL}watchlist/`;
    const response = await this.fetchWithTimeout(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movie }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Watchlist API Error: ${errorText}`);
    }
  }

  async getWatchlist() {
    const url = `${baseURL}watchlist/`;
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Watchlist API Error: ${errorText}`);
    }
    return response.json();
  }

  async removeFromWatchlist(movieId) {
    const url = `${baseURL}watchlist/${movieId}`;
    const response = await this.fetchWithTimeout(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Watchlist API Error: ${errorText}`);
    }
  }
}

const watchlistService = new watchlistApi();
export default watchlistService;