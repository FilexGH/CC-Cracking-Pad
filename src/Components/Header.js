import React, { Component } from "react";
import "../Styles/Header.css";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar animate__animated animate__slideInLeft">
          <h3 onClick={() => this.props.changePage("Home")}>Cracking Pad</h3>
          <ul>
            <li onClick={() => this.props.changePage("Classic")}>Classic</li>
            <li onClick={() => this.props.changePage("Solo")}>Solo</li>
          </ul>
        </nav>
      </div>
    );
  }
}
