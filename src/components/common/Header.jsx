import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";
import { usePopover } from '@hooks/usePopover';
import { UserIcon } from "@icons";

const Header = () => {
  const { isLoggedIn, firstName } = useUser();
  const { popovers, togglePopover } = usePopover();
  
  return (
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
          <div className="navbar-user relative flex flex-row justify-center items-center gap-4">
            <button className="p-0 bg-transparent popover-button" onClick={() => togglePopover("user-menu")}>
              <UserIcon className="text-accent-500 bg-primary-500 rounded-full p-2" height="44px" width="44px" />
            </button>
            {popovers["user-menu"] && (
              <div className="popover flex flex-col gap-4 absolute right-0 top-full mt-6 w-48 bg-primary-700 p-4 rounded-2xl shadow-lg z-10">
                <p className="text-white">Hello, {firstName}!</p>
                <ul className="flex flex-col gap-2">
                  <li className="block w-full text-left text-sm text-gray-700">Profile</li>
                  <li className="block w-full text-left text-sm text-gray-700">Settings</li>
                  <li className="block w-full text-left text-sm text-gray-700">Account</li>
                </ul>
                <button className="block w-full text-left text-sm text-gray-700">
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-buttons-wrapper flex flex-row gap-2">
            <button className="border-2 bg-transparent border-secondary-300 text-secondary-300">
              Login
            </button>
            <button className="border-2 border-secondary-500">
              Sign Up
            </button>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
