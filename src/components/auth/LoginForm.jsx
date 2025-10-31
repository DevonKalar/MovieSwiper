import { SignInIcon } from "@icons";
import { useUser } from "../../providers/UserProvider";
import { useState } from 'react';
import AuthService from '../../services/AuthService';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const { setFirstName } = useUser();
  const { setIsLoggedIn } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    const loginData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await AuthService.login(loginData);
      setIsLoggedIn(true);
      setFirstName(response.firstName);
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message || "Login failed");
    }
  };

  return (
    <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
    <div>
      <h2>Login</h2>
      <p className="mt-2">Welcome back!<br /> Log in to your account below.</p>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
    <div className="flex flex-col gap-2">
    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-0 border-b-2 border-primary-200 rounded-none" />
    <label htmlFor="password">Password</label>
    <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="border-0 border-b-2 border-primary-200 rounded-none" />
    </div>
    <button type="submit" form="login-form" className="mt-4">
      Sign In <SignInIcon className="inline-block ml-2" height={20} width={20} />
    </button>
    </form>
  )
};

export default LoginForm;