import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row justify-center items-center min-h-20 bg-primary-700 p-4">
      <div className="w-full max-w-7xl flex flex-row justify-between items-center">
        <Link to="/" className="home-link">
          <h1 className="text-white m-0 text-2xl md:text-5xl">MovieSwiper</h1>
        </Link>
        <nav className="flex flex-row gap-4 justify-center items-center">
          <NavLink to="/" className="nav-link text-white">
            Discover
          </NavLink>
          <NavLink to="/watchlist" className="nav-link text-white">
            Watchlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
