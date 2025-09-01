import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex-row justify-between items-center">
      <Link to="/" className="home-link">
        <h1 className="logo">MovieSwiper</h1>
      </Link>
      <nav>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/likes" className="nav-link">
          Likes
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
