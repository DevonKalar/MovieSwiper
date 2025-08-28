import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="home-link">
        <h1 className="logo">Movie Swiper</h1>
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
