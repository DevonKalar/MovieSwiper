import Discover from '@pages/Discover';
import MainLayout from '@layouts/MainLayout';
import AuthService from '@services/AuthService';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe } from 'vitest';
import { UserProvider } from '@providers/UserProvider';

describe('Authentication Flow Integration Test', () => {
  test('User can sign up, log in, and log out successfully', async () => {
    // Mock successful registration and login responses
    AuthService.register = vi.fn().mockResolvedValue({ firstName: 'Test', lastName: 'User' });
    AuthService.login = vi.fn().mockResolvedValue({ firstName: 'Test', lastName: 'User' });
    AuthService.logout = vi.fn().mockResolvedValue({});
    render(
      <Router>
        <UserProvider>
          <MainLayout>
            <Discover />
          </MainLayout>
        </UserProvider>
      </Router>
    );
    // Open sign-up modal
    const signUpButton = screen.getAllByRole('button', { name: /Sign Up/i });
    fireEvent.click(signUpButton[0]);
    // Simulate user filling out the sign-up form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continue/i));
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    // Open menu to verify logged in state
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await waitFor(() => {
      expect(screen.getByText(/Logged in as Test/i)).toBeInTheDocument();
    });
    // Simulate user logging out
    fireEvent.click(screen.getByRole('button', { name: /Sign Out/i }));
    await waitFor(() => {
      const loginButtons = screen.getAllByRole('button', { name: /Login/i });
      expect(loginButtons).toHaveLength(2);
    });
    // Simulate user logging in
    const loginButtons = screen.getAllByRole('button', { name: /Login/i });
    fireEvent.click(loginButtons[0]);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText(/Logged in as/i)).toBeInTheDocument();
    });
  });
});
