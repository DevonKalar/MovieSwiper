import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import authService from '@/services/auth';
import type { 
  User, 
  UserApiResponse, 
  LoginCredentials,
  RegisterData } from '@/types/auth';
import type { ProviderProps } from '@/types/provider';

const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function checkAuthStatus(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const rawData: UserApiResponse = await authService.getCurrentUser();
      const userData: User = {
        firstName: rawData.firstName,
        lastName: rawData.lastName,
        email: rawData.email,
        id: rawData.id,
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function login(credentials: LoginCredentials): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const rawData: UserApiResponse = await authService.login(credentials);
      const userData: User = {
        firstName: rawData.firstName,
        lastName: rawData.lastName,
        email: rawData.email,
        id: rawData.id,
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Login failed');
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Logout failed');
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(registerData: RegisterData): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const rawData: UserApiResponse = await authService.register(registerData);
      const userData: User = {
        firstName: rawData.firstName,
        lastName: rawData.lastName,
        email: rawData.email,
        id: rawData.id,
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Register failed');
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      isLoading, 
      error, 
      login, 
      logout, 
      register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;