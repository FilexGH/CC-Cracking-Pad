import React, { Component } from "react";
import "../../Styles/Classic/ClassicResult.css";

export default class Classic extends Component {
  close = () => {
    this.props.ClassicC.setState({
      Guessed: false,
    });
  };
  render() {
    return (
      <div className="ClassicResult">
        <div className="Results">
          <div className="Title">Results</div>
          <div className="Data">
            <p>Max Number: {this.props.ClassicC.Max}</p>
            <p>Target Number: {this.props.ClassicC.Guess}</p>
            <p>Number Of Attempts: {this.props.ClassicC.Attempts}</p>
            <p>Time Spent: {this.props.ClassicC.TimeSpent}ms</p>
          </div>
          <div onClick={this.close.bind(this)} className="Close">
            CLOSE
          </div>
        </div>
      </div>
    );
  }
}
