// App is the central react page that contains the three components, header, footer, and content of our page
import "./App.css";

// Header defines the top area that includes the nav bar
import Header from "./components/Header/Header";

// Footer is the bottom area of the page
import Footer from "./components/Footer/Footer";
import { useState } from "react";

// outlet determines which component displays in content section
import { Outlet } from "react-router-dom";

function App() {
  // defines state and uses function setCurrentPage
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
