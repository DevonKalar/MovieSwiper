const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}auth/`;

class AuthService {
  constructor() {
    this.timeout = 10000; // 10 second timeout
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

  async register(userData) {
    const response = await this.fetchWithTimeout(`${baseUrl}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    // Parse response regardless of status to get server message
    let data = null;
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    }
    
    if (!response.ok) {
      // Use server's error message if available, fallback to generic message
      const errorMessage = data?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return data;
  }

  async login(credentials) {
    const response = await this.fetchWithTimeout(`${baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    
    // Parse response regardless of status to get server message
    let data = null;
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    }
    
    if (!response.ok) {
      // Use server's error message if available, fallback to generic message
      const errorMessage = data?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return data;
  }
  
  async logout() {
    const response = await this.fetchWithTimeout(`${baseUrl}logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    // Parse response regardless of status to get server message
    let data = null;
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    }
    
    if (!response.ok) {
      // Use server's error message if available, fallback to generic message
      const errorMessage = data?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return data;
  }
}

export default new AuthService();
