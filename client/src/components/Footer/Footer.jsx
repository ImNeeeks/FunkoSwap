import React from "react";
import "./Footer.css";

//component for footer
function Footer() {
  return (
    <footer className="footerContainer">
      <p className="footerText">Made by:</p>
      <ul className="footerList">
        <li className="footerLink">
          <a href="https://github.com/taperez1989" target="_blank" rel="noopener noreferrer">
          taperez1989
          </a>
        </li>
        <li className="footerLink">
          <a href="https://github.com/ImNeeeks" target="_blank" rel="noopener noreferrer">
          ImNeeeks
          </a>
        </li>
        <li className="footerLink">
          <a href="https://github.com/robscafe433" target="_blank" rel="noopener noreferrer">
          robscafe433
          </a>
        </li>
        <li className="footerLink">
          <a href="https://github.com/scurvyirv" target="_blank" rel="noopener noreferrer">
          scurvyirv
          </a>
        </li>
        <li className="footerLink">
          <a href="https://github.com/davehyler" target="_blank" rel="noopener noreferrer">
          davehyler
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;