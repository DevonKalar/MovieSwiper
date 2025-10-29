const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}auth/`;

class AuthService {
  async register(userData) {
    const response = await fetch(`${baseUrl}register`, {
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
    const response = await fetch(`${baseUrl}login`, {
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
    const response = await fetch(`${baseUrl}logout`, {
      method: "POST",
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
