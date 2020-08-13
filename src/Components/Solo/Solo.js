import React, { Component } from "react";
import Pad from "../Pad";
import Options from "./Options";
import "../../Styles/Solo/Solo.css";
import SoloPic from "../../img/Backgrounds/SoloPic.png";
import DOOR1 from "../../img/Solo/DOOR1.png";
import DOOR2 from "../../img/Solo/DOOR2.png";
import DOOR3 from "../../img/Solo/DOOR2.png";
import SAFE1 from "../../img/Solo/SAFE1.png";
import SAFE2 from "../../img/Solo/SAFE2.png";
import SAFE3 from "../../img/Solo/SAFE3.png";
import SAFE4 from "../../img/Solo/SAFE4.png";
import SAFE5 from "../../img/Solo/SAFE5.png";
import SAFE6 from "../../img/Solo/SAFE6.png";
import SAFE7 from "../../img/Solo/SAFE7.png";
import SAFE8 from "../../img/Solo/SAFE8.png";

const KEY_WORDS = ["HIGHER", "LOWER", "START GUESSING!", "START!"];
const STEPS_NAMES = [
  "DOOR1",
  "DOOR2",
  "DOOR3",
  "SAFE1",
  "SAFE2",
  "SAFE3",
  "SAFE4",
  "SAFE5",
  "SAFE6",
  "SAFE7",
  "SAFE8",
];
const MAXIMUMS = [
  1000000,
  2500000,
  5000000,
  1000000,
  2000000,
  3000000,
  4000000,
  5000000,
  6000000,
  7000000,
  8000000,
];
const DOORS_PICS = {
  DOOR1: DOOR1,
  DOOR2: DOOR2,
  DOOR3: DOOR3,
  SAFE1: SAFE1,
  SAFE2: SAFE2,
  SAFE3: SAFE3,
  SAFE4: SAFE4,
  SAFE5: SAFE5,
  SAFE6: SAFE6,
  SAFE7: SAFE7,
  SAFE8: SAFE8,
};

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class Solo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      Time: 60 * 20,
    };
    this.reenter = this.reenter.bind(this);
    this.restart = this.restart.bind(this);
    this.startWith = "SAFE1";
    this.Safes = false;
    this.currentStep = 0;
    this.Guess = 0;
    this.TimeSpent = 0;
    this.Attempts = 0;
    this.moveStep = 1;
  }
  onEnter = (PadC, number) => {
    if (PadC.lastCheck === KEY_WORDS[3]) {
      this.indexer(PadC, false);
    } else {
      this.checkNumber(PadC, number);
    }
  };
  checkNumber = (PadC, number) => {
    let newState;
    this.Attempts = this.Attempts + 1;
    if (number === PadC.Guess) {
      return this.indexer(PadC, false);
    }
    if (number > PadC.Guess) {
      newState = KEY_WORDS[1];
    } else if (number < PadC.Guess) {
      newState = KEY_WORDS[0];
    }
    PadC.lastCheck = newState;
    PadC.setState({ input: newState });
  };
  indexer = (PadC, reEnter) => {
    this.PadC = PadC;
    if (this.currentStep === 0 && !reEnter) {
      this.setState({ logs: [], Time: 60 * 20 });
      this.Interval = setInterval(() => this.updateTime(), 1000);
    }
    this.moveToSafes();
    this.setPositionData(PadC);
    this.registerLogs(reEnter);
    this.currentStep += this.moveStep;
    this.TimeSpent = new Date().getTime();
    this.Guess = PadC.Guess;
    this.checkIfLastSafe(PadC);
  };
  updateTime = () => {
    this.setState({ Time: this.state.Time - 1 });
    if (this.state.Time === 0) {
      return this.endSolo(this.PadC);
    }
  };
  moveToSafes = () => {
    if (this.currentStep === 3 && !this.Safes) {
      this.setState({ Time: 60 * 5 });
      this.Safes = true;
      if (this.startWith === "SAFE8") {
        this.moveStep = -1;
        this.currentStep = MAXIMUMS.length - 1;
      }
    }
  };
  reenter = () => {
    if (this.currentStep === 0) return;
    this.currentStep = this.currentStep - this.moveStep;
    this.indexer(this.PadC, true);
  };
  resetData = () => {
    this.Guess = 0;
    this.TimeSpent = 0;
    this.Attempts = 0;
  };
  registerLogs = (reEnter) => {
    if (this.Guess && !reEnter) {
      this.TimeSpent = new Date().getTime() - this.TimeSpent;
      let logsCopy = this.state.logs.slice();
      logsCopy.push([this.Guess, this.TimeSpent, this.Attempts]);
      this.setState({
        logs: logsCopy,
      });
      this.resetData();
    }
  };
  setPositionData = (PadC) => {
    let newState = STEPS_NAMES[this.currentStep];
    document.body.style.backgroundImage = `url(${DOORS_PICS[newState]})`;
    PadC.lastCheck = newState;
    PadC.Guess = randomNumber(0, MAXIMUMS[this.currentStep]);
    PadC.Info = `Number Between 0 - ${MAXIMUMS[this.currentStep]}`;
    PadC.setState({ input: newState });
  };
  checkIfLastSafe = (PadC) => {
    if (this.Safes) {
      if (this.currentStep === 1 && this.startWith === "SAFE8")
        return this.endSolo(PadC);
      if (this.currentStep === MAXIMUMS.length + 1) return this.endSolo(PadC);
    }
  };
  restart = () => {
    if (this.currentStep === 0) return;
    this.endSolo(this.PadC);
  };
  endSolo = (PadC) => {
    clearInterval(this.Interval);
    this.resetData();
    this.currentStep = 0;
    this.moveStep = 1;
    this.Safes = false;
    PadC.lastCheck = KEY_WORDS[3];
    PadC.Guess = false;
    PadC.Info = "";
    PadC.setState({ input: KEY_WORDS[3] });
    document.body.style.backgroundImage = `url(${SoloPic})`;
  };
  componentWillUnmount() {
    if (this.Interval) {
      clearInterval(this.Interval);
    }
  }
  render() {
    return (
      <div className="Solo">
        <Pad INPUT="START!" Mode="Solo" onEnter={this.onEnter} />
        <Options
          Time={this.state.Time}
          reEnter={this.reenter}
          restart={this.restart}
          SoloC={this}
        />
      </div>
    );
  }
}
