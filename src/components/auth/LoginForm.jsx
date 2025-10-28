import { SignInIcon } from "@icons";
import { useUser } from "../../providers/UserProvider";
import { useState } from 'react';
import AuthService from '../../services/AuthService';

const LoginForm = () => {
  const { setIsLoggedIn } = useUser();
  const [error, setError] = useState(null);
  const { setFirstName } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked");
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      const response = await AuthService.login(loginData);
      setIsLoggedIn(true);
      setFirstName(response.firstName);
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed");
    }
  };

  return (
    <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
    <div>
      <h2>Login</h2>
      <p className="mt-2">Welcome back!<br /> Log in to your account below.</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
    <div className="flex flex-col gap-2">
    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email" className="border-0 border-b-2 border-primary-200 rounded-none" />
    <label htmlFor="password">Password</label>
    <input type="password" id="password" placeholder="Enter your password" className="border-0 border-b-2 border-primary-200 rounded-none" />
    </div>
    <button type="submit" form="login-form" className="mt-4">
      Sign In <SignInIcon className="inline-block ml-2" height={20} width={20} />
    </button>
    </form>
  )
};

export default LoginForm;