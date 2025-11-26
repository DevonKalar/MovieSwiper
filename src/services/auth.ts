import type { User, LoginCredentials, RegisterData } from "../types/auth";

class AuthService {
  private readonly timeout: number;
  private readonly baseUrl: string;

  constructor(backendUrl: string = import.meta.env.VITE_BACKEND_URL) {
    this.timeout = 10000; // 10 second timeout
    this.baseUrl = `${backendUrl}auth`;
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

  async register(userData: RegisterData): Promise<User> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/register`, {
      method: "POST",
      credentials: "include",
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

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await this.fetchWithTimeout(`${this.baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      
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

  async getCurrentUser(): Promise<User> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/check`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
