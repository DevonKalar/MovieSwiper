import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary-700 flex-row justify-center p-4">
      <div className="w-full max-w-7xl flex flex-row justify-between items-center mx-auto">
        <Link to="/" className="home-link">
          <h1 className="text-white m-0 text-2xl">MovieSwiper</h1>
        </Link>
        <nav className="flex flex-row gap-4 justify-center items-center">
          <NavLink to="/" className="nav-link text-white">
            Discover
          </NavLink>
          <NavLink to="/likes" className="nav-link text-white">
            Watch
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
