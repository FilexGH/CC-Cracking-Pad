import React, { Component } from "react";
import Pad from "../Pad";
import "../../Styles/Classic/Classic.css";
import ClassicResult from "./ClassicResult";

const KEY_WORDS = ["HIGHER", "LOWER", "INSERT A MAX", "START GUESSING!"];

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class Classic extends Component {
  constructor(props) {
    super(props);
    this.Max = 0;
    this.Guess = 0;
    this.TimeSpent = 0;
    this.Attempts = 0;
    this.state = {
      Guessed: false,
    };
  }
  onEnter = (PadC, number) => {
    if (PadC.lastCheck === KEY_WORDS[2]) {
      this.startSession(PadC, number);
    } else {
      this.checkNumber(PadC, number);
    }
  };
  startSession = (PadC, max) => {
    PadC.lastCheck = KEY_WORDS[3];
    PadC.Info = `Number Between 0 - ${max}`;
    PadC.Guess = randomNumber(0, max);
    PadC.setState({ input: KEY_WORDS[3] });
    this.Max = max;
    this.Guess = PadC.Guess;
    this.TimeSpent = new Date().getTime();
    this.Attempts = 0;
  };
  checkNumber = (PadC, number) => {
    let newState;
    this.Attempts = this.Attempts + 1;
    if (number > PadC.Guess) {
      newState = KEY_WORDS[1];
    } else if (number < PadC.Guess) {
      newState = KEY_WORDS[0];
    } else if (number === PadC.Guess) {
      this.onGuessed(PadC);
      newState = KEY_WORDS[2];
    }
    PadC.lastCheck = newState;
    PadC.setState({ input: newState });
  };
  onGuessed = (PadC) => {
    PadC.Info = "";
    this.TimeSpent = new Date().getTime() - this.TimeSpent;
    this.setState({
      Guessed: true,
    });
  };
  render() {
    return (
      <div className="Classic">
        <Pad INPUT="INSERT A MAX" Mode="Classic" onEnter={this.onEnter} />
        {this.state.Guessed ? <ClassicResult ClassicC={this} /> : null}
      </div>
    );
  }
}
