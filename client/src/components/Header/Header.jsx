import React from "react";
// import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import auth from "../Content/utils/auth";
import batmanGif from "../../../../public/images/batman.gif";
import hagridGif from "../../../../public/images/hagrid.gif";

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

  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#000000",
    color: "#fff",
  };

  const titleWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "20px", // Adds space between GIFs and title
  };

  const gifContainerStyle = {
    width: "100px", // Set the square size
    height: "100px", // Same size as width for a square
    overflow: "hidden", // Hide the extra width
    display: "flex",
    justifyContent: "center", // Center the GIF horizontally
    alignItems: "center", // Center the GIF vertically
  };

  const gifStyle = {
    width: "100px",
    height: "auto",
  };

  const titleStyle = {
    fontSize: "5rem",
    fontFamily: "Dancing Script, cursive, Georgia, serif", // Fallbacks included
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: "15px",
  };

  const navContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap", // Allows buttons to wrap on smaller screens
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    flex: "1", // Makes buttons the same size
    minWidth: "120px", // Ensures a minimum width for buttons
  };

  const buttonHoverStyle = {
    backgroundColor: "#97bcf7",
  };

  // the nav bar will appear only when the use is authenticated

  return (
    <header style={headerStyle}>
      <div style={titleWrapperStyle}>
        <div style={gifContainerStyle}>
          <img src={batmanGif} alt="left gif of batman" style={gifStyle} />
        </div>
        <h1 style={titleStyle}>FunkoSwap</h1>
        <div style={gifContainerStyle}>
          <img src={hagridGif} alt="right gif of hagrid" style={gifStyle} />
        </div>
      </div>
      {loggedIn && (
        <nav style={navContainerStyle}>
          <Link to="/app/myCollection">
            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              COLLECTION
            </button>
          </Link>

          <Link to="/app/myWishlist">
            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              WISHLIST
            </button>
          </Link>

          <Link to="/app/mySale">
            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              CART
            </button>
          </Link>

          <Link to="/app/Search">
            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              SEARCH
            </button>
          </Link>

          <button
            style={buttonStyle}
            onClick={auth.logout}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            LOGOUT
          </button>
        </nav>
      )}
    </header>
  );
}

// export this component to the parent component App
export default Header;
