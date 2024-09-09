import React from "react";
import "./MyFunkoSale.css";

// this section houses the funkos the user wishes to sell
// these funkos will have an add to cart feature upon clicking the price button
function MyFunkoSale() {
  return (
    <section className="outerContainer">
      <article className="funkoContainer">
        <img
          src="/images/darthvader.jpg"
          alt="darth vader white"
          className="images"
        ></img>
        <h3 className="=funkoName">darth vader in white</h3>
        <button className="priceButton">$12.00</button>
      </article>
      <article className="funkoContainer">
        <img
          src="/images/charmander.png"
          alt="charmander funko"
          className="images"
        ></img>
        <h3 className="=funkoName">charmander</h3>
        <button className="priceButton">$10.00</button>
      </article>
    </section>
  );
}

export default MyFunkoSale;
