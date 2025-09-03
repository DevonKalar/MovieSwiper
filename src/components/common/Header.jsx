import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex-row justify-center">
      <div className="container-xl flex-row justify-between items-center full">
        <Link to="/" className="home-link">
          <h1 className="logo m-0">MovieSwiper</h1>
        </Link>
        <nav>
          <NavLink to="/" className="nav-link">
            Discover
          </NavLink>
          <NavLink to="/likes" className="nav-link">
            Watch List
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
