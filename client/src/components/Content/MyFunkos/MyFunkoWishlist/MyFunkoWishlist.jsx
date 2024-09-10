import React from "react";
import "./MyFunkoWishlist.css";

// this section houses the user's wishlist of funkos they do not own for others to see
function MyFunkoWishlist() {
  return (
    <section className="outerContainer">
      <article className="funkoContainer">
        <img
          src="/images/vaporeon.jpg"
          alt="vaporeon diamond funko"
          className="images"
        ></img>
        <h3 className="=funkoName">vaporeon diamond edition</h3>
      </article>
      <article className="funkoContainer">
        <img
          src="/images/aangandmomo.png"
          alt="aang and momo funko"
          className="images"
        ></img>
        <h3 className="=funkoName">aang and momo funko</h3>
      </article>
    </section>
  );
}

export default MyFunkoWishlist;
