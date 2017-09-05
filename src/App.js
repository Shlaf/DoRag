
import React, { Component } from 'react';

// Components
import Button from "./components/button";

// Functions
import Addition from "./functions/addition";
import Subtract from "./functions/subtract";
import Multiply from "./functions/multiply";
import Divide from "./functions/divide";
import Rotation from 'react-rotation'



import './App.css';
import './Color.css';

class App extends Component {

  state = {
      input: "",
      math: null,
      sum: null,
      resetNext: false,
      firstEntry: true,
      theme: "red",
    };

    buttons = ["C", "(-)", "<", "/", 1, 2, 3, "*", 4, 5, 6, "-", 7 ,8, 9, "+", 0, ".", "="];
  


  // Run when app is loaded
  componentWillMount() {
    this.getLocalStorage();
  }


  handleInputClick(input) {
        this.setState({whatevz:false});

    if (typeof input === "number") {

      if (this.state.resetNext) {
        // reset input if resetNext = true
        this.setState({input: input.toString(), resetNext: false});
      } else {
        // Concatenate input string
        this.setState({input : this.state.input === "" ?  input.toString() : this.state.input + input.toString()});
      }

    } else if (input === "(-)") {
      // If user input negative (-)
      this.handelNegative();

    } else if (input === ".") {
      // If user input negative (-)
      this.handelComma();

    } else if (input === "C" || input.toUpperCase() === "C") {
      // If user input C
      this.handelClear();

    } else if (input === "=") {
      // If user input =
      this.handelEqual();

    } else if (input === "<") {
      // If user input < (backspace)
      this.handelBackspace();

    } else if (this.state.input !== "") {
      // If user input +, -, *, /...
      this.setState({resetNext: true});

      if (input !== this.state.math && this.state.math && this.state.math !== "=") {
        // If the user switch between +, -, *, /
        this.handelMathSwitch(input);

      } else {
        this.handelMath(input);
      }

    }
  }

  // ---------------------
  // Handle negative input, only allow one minus key
  // ---------------------
  handelNegative() {
    if (this.state.resetNext) {
      // reset input if resetNext = true
      this.setState({input: "-", resetNext: false});
    } else if (this.state.input.includes("-")) {
      return;
    } else {
        this.setState({input: this.state.input === "" ? this.state.input : "-" + this.state.input});
    }
  }

  // ---------------------
  // Handel comma input, only allow one comma key
  // ---------------------
  handelComma() {
    if (this.state.resetNext || this.state.input === "") {
      // reset input if resetNext = true
      this.setState({input: "0.", resetNext: false});
    } else if (!this.state.input.includes(".")) {
      this.setState({input: this.state.input + "."});
    }
  }

  // ---------------------
  // Reset state to original
  // ---------------------
  handelClear() {
    this.setState({
      input: "",
      math: null,
      sum: null,
      resetNext: false,
      firstEntry: true,
    });
  }

  // ---------------------
  // Delete the last number in string, backspace
  // ---------------------
  handelBackspace() {
    this.setState({input: this.state.input.slice(0, -1)});
  }

  // ---------------------
  // Handel equal: handel math, set new state
  // ---------------------
  handelEqual() {
    this.handelMath(this.state.math);
    this.setState({
      firstEntry: true,
      math: "=",
      resetNext: true,
      sum: null,
      whatevz: true
    });
  }

  // ---------------------
  // Handel math switch: handel math and set new state
  // ---------------------
  handelMathSwitch(latestInput) {
    if (typeof latestInput !== "number" && this.state.math !== latestInput) {
      this.setState({
        math: latestInput,
      });   
    } else {
      this.handelMath(this.state.math);
      this.setState({
        firstEntry: false,
        math: latestInput,
        resetNext: true
      });
    }
  }

  // ---------------------
  // Save state to localStorage
  // ---------------------
  postLocalStorage() {
    const jsonString = JSON.stringify(this.state);
    localStorage.setItem('calc', jsonString);
  }

  // ---------------------
  // Load state from localStorage
  // ---------------------
  getLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem('calc'));
    this.setState(savedState);
  }

  // ---------------------
  // Handle all math, set new state
  // ---------------------
  handelMath(input) {
    if (this.state.firstEntry) {
      // This only moves the input to state.sum
      this.setState({
        sum: this.state.input,
        math: input,
        firstEntry: false,
      });
    } else {
      switch(input) {
        case "+":
          this.setState({
            input: Addition(this.state.sum, this.state.input).toString(),
            sum: Addition(this.state.sum, this.state.input),
            math: "+",
          });
          break;
        case "-":
          this.setState({
            input: Subtract(this.state.sum, this.state.input).toString(),
            sum: Subtract(this.state.sum, this.state.input),
            math: "-"
          });
          break;
        case "*":
          this.setState({
            input: Multiply(this.state.sum, this.state.input).toString(),
            sum: Multiply(this.state.sum, this.state.input),
            math: "*"
          });
          break;
        case "/":
          this.setState({
            input: Divide(this.state.sum, this.state.input).toString(),
            sum: Divide(this.state.sum, this.state.input),
            math: "/"
          });
          break;
        default:
          break;
      }
    }
  }

  handelChangeTheme() {
    const newTheme = this.state.theme === "red" ? "blue" : "red";
    this.setState({theme: newTheme});
  }

  // React, render to DOM
  render() {
    this.postLocalStorage();
    return (
      <main>
        <div className={`calculator ${this.state.theme}`}>
          <div className="top">
            <button className="themes" onClick={() => this.handelChangeTheme()}>∞</button>
            <div></div>
            <h1>calc</h1>
          </div>
          <div className={`input ${this.state.whatevz ? "animationz" : ""}`}>
            <span>{this.state.input ? this.state.input : 0}</span>
          </div>
          {/* <div className="history">
            <span>{this.handelHistory()}</span>
          </div> */}
          <div className="button-wrapper">
            {this.buttons.map((int) => <Button key={int} onClick={this.handleInputClick.bind(this)} math={this.state.math}>{int}</Button>)}
          </div>
        </div>
      </main> 
    );
  }
}
export default App;
