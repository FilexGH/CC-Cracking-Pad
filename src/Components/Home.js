import React, { Component } from "react";
import "../Styles/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home animate__animated animate__slideInLeft">
        <h3 className="animate__animated animate__slideInLeft ">
          Welcome To Our Cracking Pad!
        </h3>
        <div>
          <h4 className="animate__animated animate__slideInLeft ">
            Introducion
          </h4>
          <p className="animate__animated animate__fadeIn animate__delay-1s ">
            This project was mainly built to provide a cracking platforme online
            for{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://multitheftauto.com/"
            >
              MTA:SA
            </a>{" "}
            players, The Cracking Pad is a minigame used on multiple gamemodes
            that consists of having a max number and going through lower and
            higher numbers till you guess it. Ours mainly simulates the one on{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://saesrpg.uk/"
            >
              SAES:RPG
            </a>{" "}
            Server.
          </p>
        </div>
        <div>
          <h4 className="animate__animated animate__slideInLeft ">Credits:</h4>
          <p className="animate__animated animate__fadeIn animate__delay-1s ">
            This Project was mainly developped by FilexGH owner and founder of
            Clock Corporation, Clock Corporation is a platforme that allows
            people to suggest ideas in order to see them in live projects, you
            can join our official discord server down by clicking on the discord
            icon.
          </p>
        </div>
        <div>
          <h4 className="animate__animated animate__slideInLeft ">
            Technologies:
          </h4>
          <p className="animate__animated animate__fadeIn animate__delay-1s ">
            This was built in{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://reactjs.org/"
            >
              React.JS
            </a>{" "}
            and{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://animate.style/"
            >
              Animate.css.
            </a>
          </p>
        </div>
      </div>
    );
  }
}
