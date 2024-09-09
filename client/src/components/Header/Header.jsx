import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// useEffect will change how page appears before and after
// this component includes the nav bar and its JS
function Header(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  // the nav bar will appear only when the use is authenticated
  return (
    <header className="headerContainer">
      <h1 className="headerTitle"> placeholder </h1>
      {loggedIn && (
        <nav className="navContainer">
          <Link to="/app/myCollection">
            <button className="navButton">my collection</button>
          </Link>

          <Link to="/app/myWishlist">
            <button className="navButton">my wishlist</button>
          </Link>

          <Link to="/app/mySale">
            <button className="navButton">my sales</button>
          </Link>

          <Link to="/app/otherCollections">
            <button className="navButton">other funko collections</button>
          </Link>

          <Link to="/app/otherSales">
            <button className="navButton">other funko markets</button>
          </Link>
        </nav>
      )}
    </header>
  );
}

// export this component to the parent component App
export default Header;
