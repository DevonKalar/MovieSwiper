import { Link, NavLink } from "react-router-dom";
import { useUser } from "@providers/UserProvider";
import Modal from "@components/common/Modal";
import SignUpForm from "@components/auth/SignUpForm";
import LoginForm from "@components/auth/LoginForm";
import UserMenu from "@components/auth/UserMenu";

const Header = () => {
  const { isLoggedIn } = useUser();
  
  return (
    /* Desktop */
    <header className="flex flex-row justify-center items-center min-h-20 p-4">
      <div className="w-full max-w-7xl flex flex-row justify-between items-center">
        <Link to="/" className="home-link">
          <h1 className="text-white m-0 text-2xl md:text-5xl">MovieSwiper</h1>
        </Link>
        <div className="menu-wrapper flex flex-row gap-8 bg-primary-700 rounded-full px-6 py-4">
        <nav className="flex flex-row gap-4 justify-center items-center">
          <NavLink to="/" className="nav-link text-white">
            Discover
          </NavLink>
          <NavLink to="/watchlist" className="nav-link text-white">
            Watchlist
          </NavLink>
        </nav>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div className="navbar-buttons-wrapper flex flex-row gap-2">
            <Modal buttonText="Login"
             buttonClass="border-2 bg-transparent border-secondary-300 text-secondary-300" 
             modalClass="flex flex-col justify-center gap-4 items-between"
            >
              <LoginForm />
            </Modal>
            <Modal 
            buttonText="Sign Up"
            modalClass="flex flex-col justify-center gap-4 items-between w-full max-w-lg"
            >
              <SignUpForm />
            </Modal>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
