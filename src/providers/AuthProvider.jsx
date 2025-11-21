import { AuthProvider } from './AuthContext';
import { useState } from 'react';
import authService from '@/services/authService';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const rawData = await authService.login(credentials);
      const userData = {
        firstname: rawData.firstName,
        lastname: rawData.lastName,
        email: rawData.email,
        id: rawData.id,
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setError(null);
    try {
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData) => {
    setIsLoading(true);
    setError(null);
    try {
      const rawData = await authService.register(registerData);
      const userData = {
        firstname: rawData.firstName,
        lastname: rawData.lastName,
        email: rawData.email,
        id: rawData.id,
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthProvider.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthProvider;