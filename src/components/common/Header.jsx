import { Link, NavLink } from "react-router-dom";
import { useUser } from "@providers/UserProvider";
import Modal from "@components/common/Modal";
import SignUpForm from "@components/auth/SignUpForm";
import LoginForm from "@components/auth/LoginForm";
import UserMenu from "@components/auth/UserMenu";
import { usePopover } from "@hooks/usePopover";
import { SignOutIcon } from "@icons";
import AuthService from "@services/AuthService";

const Header = () => {
  const { isLoggedIn } = useUser();
  const { popovers, togglePopover } = usePopover();
  const { firstName, setIsLoggedIn } = useUser();

  const handleLogout = async () => {
      try {
        await AuthService.logout();
        setIsLoggedIn(false);
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    };

  return (
    
    <header className="flex flex-row justify-center items-center min-h-20 p-4">
      {/* Desktop */}
      <div className="hidden md:flex w-full max-w-7xl flex-row justify-between items-center ">
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
      {/* Mobile */}
      <div className="mobile-header relative flex flex-row justify-between items-center w-full md:hidden">
        <Link to="/" className="home-link">
          <h1 className="text-white m-0 text-2xl">MovieSwiper</h1>
        </Link>
        <button className={`${popovers["mobile-menu"] ? "bg-secondary-600" : ""} mobile-menu-button popover-button`} id="mobile-menu-button" onClick={() => togglePopover("mobile-menu")}>
          Menu
        </button>
        {popovers["mobile-menu"] && (
        <div className="mobile-collapse-menu absolute right-0 top-full w-full bg-primary-700 p-4 mt-4 rounded-2xl flex flex-col gap-2 z-5 popover">
          <nav className="flex flex-col gap-2 justify-center items-end px-4 py-2">
            <NavLink to="/" onClick={() => togglePopover("mobile-menu")} className="nav-link text-white">
              Discover
            </NavLink>
            <NavLink to="/watchlist" onClick={() => togglePopover("mobile-menu")} className="nav-link text-white">
              Watchlist
            </NavLink>
            {isLoggedIn && (
              <>
                <hr className="border-1 w-full border-primary-400" />
                <NavLink to="/profile" className="nav-link text-white">
                  Profile
                </NavLink>
                <NavLink to="/settings" className="nav-link text-white">
                  Settings
                </NavLink>
                <NavLink to="/account" className="nav-link text-white">
                  Account
                </NavLink>
                
              </>
            )}
          </nav>
          {isLoggedIn ? (
            <>
            <p className="self-center">Logged in as {firstName}, not you?</p>
            <button className="block w-full text-sm text-gray-700" onClick={handleLogout}>
              Sign Out
              <SignOutIcon className="inline-block ml-2" height={16} width={16} />
            </button>
            </>
          ) : (
            <>
              <Modal buttonText="Login"
                buttonClass="border-2 bg-transparent border-secondary-300 text-secondary-300"
                modalClass="flex flex-col justify-center gap-4 items-between w-full max-w-lg mx-4"
              >
                <LoginForm />
              </Modal>
              <Modal
                buttonText="Sign Up"
                modalClass="flex flex-col justify-center gap-4 items-between w-full max-w-lg mx-4"
              >
                <SignUpForm />
              </Modal>
            </>
          )}
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
