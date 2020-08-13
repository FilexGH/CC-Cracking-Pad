import React, { Component } from "react";
import "../../Styles/Solo/Options.css";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startWith: "SAFE1",
    };
    this.logs = [];
  }
  toTimeString = (s) => {
    let seconds = Math.trunc(s % 60);
    let hours = Math.trunc(s / 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    hours = hours < 10 ? "0" + hours : hours;
    return `${hours}:${seconds}`;
  };
  changeStartWith = () => {
    let newStartWith;
    if (this.props.SoloC.Safes) return;
    if (this.state.startWith === "SAFE1") {
      newStartWith = "SAFE8";
    } else {
      newStartWith = "SAFE1";
    }
    this.setState({
      startWith: newStartWith,
    });
    this.props.SoloC.startWith = newStartWith;
  };
  formatLogs = () => {
    this.logs = [];
    let count = 1;
    this.props.SoloC.state.logs.forEach((log) => {
      let currentSafe = "DOOR" + count;
      if (count > 3) {
        if (this.state.startWith === "SAFE8") {
          currentSafe = "SAFE" + (12 - count);
        } else {
          currentSafe = "SAFE" + (count - 3);
        }
      }
      this.logs.push(
        <p>
          {currentSafe}
          <br />
          Target Number: {log[0]}
          <br />
          Number Of Attempts: {log[2]}
          <br />
          Time Taken: {log[1]}ms
          <br />
        </p>
      );
      count++;
    });
    return this.logs;
  };
  render() {
    return (
      <div className="Options animate__animated animate__slideInRight">
        <div className="Title">Options</div>
        <div className="OButtons">
          <div onClick={this.props.restart}>Restart</div>
          <div onClick={this.props.reEnter}>Re-Enter</div>
          <div onClick={this.changeStartWith}>
            Start With {this.state.startWith}
          </div>
          <div className="Time">Time: {this.toTimeString(this.props.Time)}</div>
        </div>
        <div className="Logs">{this.formatLogs()}</div>
      </div>
    );
  }
}
