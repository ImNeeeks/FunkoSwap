import React from "react";
import "./MyFunkoCollection.css";
// SEND REQUEST TO BACKEND to find User ID = myID and give "MyCollection" array
// the collection houses the user's own collection of funkos
// the general structure of the funko function contains the funko's name and image
function MyFunkoCollection() {
  return (
    <section className="outerContainer">
      <article className="funkoContainer">
        <img
          src="/images/batman.png"
          alt="batman funko"
          className="images"
        ></img>
        <h3 className="=funkoName">batman</h3>
      </article>
      <article className="funkoContainer">
        <img
          src="/images/captainamerica.png"
          alt="captain america funko"
          className="images"
        ></img>
        <h3 className="=funkoName">captain america</h3>
      </article>
    </section>
  );
}

export default MyFunkoCollection;
