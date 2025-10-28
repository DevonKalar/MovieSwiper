const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}auth/`;

class AuthService {
  async register(userData) {
    try {
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
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {    
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
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
