import React, { Component } from "react";
import "../Styles/Pad.css";

const KEY_WORDS = ["HIGHER","LOWER","INSERT A MAX","START GUESSING!","START!"];
const STEPS_NAMES = ["DOOR1", "DOOR2", "DOOR3", "SAFE1", "SAFE2", "SAFE3", "SAFE4", "SAFE5", "SAFE6", "SAFE7", "SAFE8"];

let formatNumber = (text) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let removeDots = (text) => {
  while (text.indexOf(".") !== -1) text = text.replace(".", "");
  return text;
};

export default class Pad extends Component {
  constructor(props) {
    super(props);
    this.PadRef = React.createRef(this);
    this.Guess = false;
    this.Info = "";
    this.keyHandler = this.keyHandler.bind(this);
    this.addNewDigit = this.addNewDigit.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.removeLastDigit = this.removeLastDigit.bind(this);
    this.lastCheck = this.props.INPUT;
    this.state = {
      input: this.props.INPUT,
    };
  }
  removeLastDigit = () => {
    if (
      KEY_WORDS.includes(this.state.input) ||
      STEPS_NAMES.includes(this.state.input)
    )
      return;
    let currentInput = this.state.input.slice();
    let newInput = removeDots(currentInput);
    newInput = formatNumber(newInput.slice(0, newInput.length - 1));
    if (newInput === "") newInput = this.lastCheck;
    this.setState({
      input: newInput,
    });
  };
  onEnter = () => {
    if (this.props.Mode === "Solo" && this.state.input === KEY_WORDS[4])
      this.props.onEnter(this);
    if (
      KEY_WORDS.includes(this.state.input) ||
      STEPS_NAMES.includes(this.state.input)
    )
      return;
    this.props.onEnter(this, parseInt(removeDots(this.state.input)));
  };
  addNewDigit = (e) => {
    if (this.props.Mode === "Solo" && !this.Guess) return;
    let eText;
    if (e.target) {
      eText = e.target.innerText;
    } else {
      eText = e;
    }
    let newInput = this.state.input.slice();
    if (KEY_WORDS.includes(newInput) || STEPS_NAMES.includes(newInput))
      newInput = "";
    this.setState({
      input: formatNumber(removeDots(newInput) + eText),
    });
  };
  keyHandler = (e) => {
    let key = e.key;
    if (key === "Enter") {
      this.onEnter();
    } else if (key === "Backspace") {
      this.removeLastDigit();
    } else if (parseInt(key) || parseInt(key) === 0) {
      this.addNewDigit(key);
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", this.keyHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyHandler);
  }
  render() {
    return (
      <div
        ref={this.PadRef}
        className="Pad animate__animated animate__slideInLeft"
      >
        <div className="Title animate__animated animate__fadeIn animate__delay-1s">
          Cracking Pad - {this.props.Mode}
        </div>
        <div className="Info animate__animated animate__fadeIn animate__delay-1s">
          {this.Info}
        </div>
        <div className="Input animate__animated animate__fadeIn animate__delay-1s">
          {this.state.input}
        </div>
        <div className="Buttons animate__animated animate__fadeIn animate__delay-1s">
          <div>
            <div onClick={this.addNewDigit}>1</div>
            <div onClick={this.addNewDigit}>2</div>
            <div onClick={this.addNewDigit}>3</div>
          </div>
          <div>
            <div onClick={this.addNewDigit}>4</div>
            <div onClick={this.addNewDigit}>5</div>
            <div onClick={this.addNewDigit}>6</div>
          </div>
          <div>
            <div onClick={this.addNewDigit}>7</div>
            <div onClick={this.addNewDigit}>8</div>
            <div onClick={this.addNewDigit}>9</div>
          </div>
          <div>
            <div onClick={this.removeLastDigit}>#</div>
            <div onClick={this.addNewDigit}>0</div>
            <div onClick={this.onEnter}>ENTER</div>
          </div>
        </div>
      </div>
    );
  }
}
