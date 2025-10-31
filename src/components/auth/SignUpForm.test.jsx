import SignUpForm from './SignUpForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthService from '../../services/AuthService';
import { UserProvider } from '@providers/UserProvider';
import { vi } from 'vitest';

vi.mock('../../services/AuthService');

describe('SignUpForm', () => {
  beforeEach(() => {
    AuthService.register.mockClear();
  });
  const renderComponent = () => {
    return render(
      <UserProvider>
        <SignUpForm />
      </UserProvider>
    );
  };
  // Stage One
  test('renders first stage of the form', () => {
    renderComponent();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue/i)).toBeInTheDocument();
  });

  test('shows error message if email is empty on Continue', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Please fill in all fields correctly./i)).toBeInTheDocument();
  });
  test('proceeds to second stage on valid email', () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  });
  // Stage Two
  test('shows error message if fields are invalid on Sign Up', () => {
    renderComponent();
    // proceed to second stage
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continue/i));
    // submit with invalid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'non matching' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    expect(screen.getByText(/Please fill in all fields correctly./i)).toBeInTheDocument();
  });
  test('calls AuthService.register on valid submission', async () => {
    renderComponent();
    // proceed to second stage
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continue/i));
    // submit with valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'Password123',
      });
    });
  });
  test('shows error message on registration failure', async () => {
    // mock failed registration response
    AuthService.register.mockRejectedValue(new Error('Registration failed'));
    renderComponent();
    // proceed to second stage
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continue/i));
    // submit with valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    await waitFor(() => {
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });
  });
});

