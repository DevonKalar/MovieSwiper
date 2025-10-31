import AuthService from "./AuthService.js";
const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api';

global.fetch = vi.fn();

describe('AuthService', () => {

  describe('register', () => {
    it('should register a user successfully', async () => {
      const mockResponse = { message: 'User registered successfully' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        json: async () => mockResponse,
      });

      const response = await AuthService.register({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123',
      });

      // verify the response
      expect(response).toEqual(mockResponse);
      // verify the correct URL and options were used
      expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'Password123',
        }),
      });
    });

    it('should handle registration errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        json: async () => ({ message: 'Registration failed' }),
      });
      
      // verify the response
      await expect(
        AuthService.register({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'Password123',
        })
      ).rejects.toThrow(Error);

      // verify the correct URL and options were used
      expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'Password123',
        }),
      });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const mockResponse = { message: 'User logged in successfully' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        json: async () => mockResponse,
      });
      const response = await AuthService.login({
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(response).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'Password123',
        }),
      });
    });

    it('should handle login errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        json: async () => ({ message: 'Login failed' }),
      });
      
      // verify the response
      await expect(
        AuthService.login({
          email: 'test@example.com',
          password: 'Password123',
        })
      ).rejects.toThrow(Error);

      // verify the correct URL and options were used
      expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'Password123',
        }),
      });
    });
    

    describe('logout', () => {
      it('should log out a user successfully', async () => {
        global.fetch.mockResolvedValueOnce({
          ok: true,
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          json: async () => ({ message: 'User logged out successfully' }),
        });
    
        const response = await AuthService.logout();
    
        expect(response).toEqual({ message: 'User logged out successfully' });
        expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
    });

    it('should handle logout errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        status: 500,
        statusText: 'Internal Server Error',
      });

      // verify the response
      await expect(AuthService.logout()).rejects.toThrow(Error);
      // verify the correct URL and options were used
      expect(global.fetch).toHaveBeenCalledWith(`${serverUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });

});
