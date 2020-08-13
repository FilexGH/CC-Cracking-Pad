import React, { Component } from "react";
import "../Styles/Footer.css";
// Images
import DiscordLogo from "../img/Icons/discordlogo.png";
import GithubLogo from "../img/Icons/githublogo.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer animate__animated animate__slideInLeft">
        <ul>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://discord.gg/NVuPtK3"
          >
            <img
              alt="discordlogo"
              src={DiscordLogo}
              width="50"
              height="50"
            ></img>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/FilexGH/CC-Cracking-Pad"
          >
            <img alt="githublogo" src={GithubLogo} width="35" height="35"></img>
          </a>
        </ul>
        <p>© 2020 By Clock Corporation</p>
      </div>
    );
  }
}
