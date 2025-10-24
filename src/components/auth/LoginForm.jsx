import { SignInIcon } from "@icons";
import { useUser } from "../../providers/UserProvider";

const LoginForm = () => {
  const { setIsLoggedIn } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
    setIsLoggedIn(true);
  };

  return (
    <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
    <div>
      <h2>Login</h2>
      <p className="mt-2">Welcome back!<br /> Log in to your account below.</p>
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