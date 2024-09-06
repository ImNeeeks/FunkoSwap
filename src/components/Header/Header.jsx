import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

// this component includes the nav bar and its JS
function Header(props) {
  return (
    <header className="headerContainer">
      <h1 className="headerTitle"> placeholder </h1>
      <nav className="navContainer">
        <Link to="/">
          <button className="navButton">my collection</button>
        </Link>

        <Link to="/myWishlist">
          <button className="navButton">my wishlist</button>
        </Link>

        <Link to="/mySales">
          <button className="navButton">my sales</button>
        </Link>

        <Link to="/otherCollections">
          <button className="navButton">other funko collections</button>
        </Link>

        <Link to="/otherSales">
          <button className="navButton">other funko markets</button>
        </Link>
      </nav>
    </header>
  );
}

// export this component to the parent component App
export default Header;
