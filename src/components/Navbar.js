import React, { Component } from "react";
import "./navbar.css";
export class Navbar extends Component {
  render() {
    return (
      <>
        <nav id="navbar" className="navbar-main">
          <div className="nav-wrapper">
            <div className="logo">
              <a href="#home">
                <i className="fa fa-angellist"></i> 
              </a>
            </div>

            <ul id="menu">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="menuIcon">
          <span className="icon icon-bars"></span>
          <span className="icon icon-bars overlay"></span>
        </div>
        <div className="overlay-menu">
          <ul id="menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Navbar;
