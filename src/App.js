import React, { Component } from 'react';
import Button from "./components/button";
import Addition from "./functions/addition";
import Subtract from "./functions/subtract";
import Multiply from "./functions/multiply";
import Divide from "./functions/divide";

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      input: "",
      math: null,
      sum: null,
      resetNext: false,
      firstEntry: true
    };
  }

  // Run when app is loaded
  componentWillMount() {
    this.getLocalStorage();
  }


  handleInputClick = (input) => {

    if (typeof input === "number") {

      if (this.state.resetNext) {
        // reset input if resetNext = true
        this.setState({input: input.toString(), resetNext: false});
      } else {

        // Concatenate input string
        this.setState({input : this.state.input + input.toString()});
      };

    } else if (input === "(-)") {
      // If user input negative (-)
      this.handelNegative();

    } else if (input === ".") {
      // If user input negative (-)
      this.handelComma();

    } else if (input === "c") {
      // If user input C
      this.handlClear();

    } else if (input === "=") {
      // If user input =
      this.handelEqual();

    } else if (input === "<") {
      // If user input < (backspace)
      this.handlBackspace();

    } else {
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
  // Handel negative input, only allow one minus key
  // ---------------------
  handelNegative() {
    if (this.state.resetNext) {
      // reset input if resetNext = true
      this.setState({input: "-", resetNext: false});
    } else if (this.state.input.includes("-")) {
      return
    } else {
        this.setState({input: "-" + this.state.input});
    };
  }

  // ---------------------
  // Handel comma input, only allow one comma key
  // ---------------------
  handelComma() {
    if (this.state.resetNext || this.state.input === "") {
      // reset input if resetNext = true
      this.setState({input: "0.", resetNext: false});
    } else {
      this.setState({input: this.state.input + "."});
    }
  }

  // ---------------------
  // Reset state to original
  // ---------------------
  handlClear() {
    this.setState({
      input: "",
      math: null,
      sum: null,
      resetNext: false,
      firstEntry: true
    });
  }

  // ---------------------
  // Delete the last number in string, backspace
  // ---------------------
  handlBackspace() {
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
      sum: null
    });
  }

  // ---------------------
  // Handel math switch: handel math and set new state
  // ---------------------
  handelMathSwitch(input) {
    this.handelMath(this.state.math);
    this.setState({
      firstEntry: false,
      math: input,
      resetNext: true
    });
  }

  // ---------------------
  // Save state to localStorege
  // ---------------------
  postLocalStorage() {
    const jsonString = JSON.stringify(this.state);
    localStorage.setItem('cal', jsonString);
  }

  // ---------------------
  // Lode state from localStorege
  // ---------------------
  getLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem('cal'));
    this.setState(savedState);
  }

  // ---------------------
  // Handel all math, set new state
  // ---------------------
  handelMath(input) {
    if (this.state.firstEntry) {
      // This only moves the input to state.sum
      this.setState({
        sum: this.state.input,
        math: input,
        firstEntry: false
      });
    } else {
      switch(input) {
        case "+":
          this.setState({
            input: Addition(this.state.sum, this.state.input).toString(),
            sum: Addition(this.state.sum, this.state.input),
            math: "+"
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
      };
    }
  }

  // React, render to DOM
  render() {
    this.postLocalStorage();
    return (
      <main>
      <div className="calculatorz">
        <form>
          <input type="text" name="value" id="value" value={this.state.input}/>
        </form>
        <div>
          {[1, 2, 3, 4, 5, 6, 7 ,8, 9, 0, "(-)", ".", "+", "-", "*", "/", "c", "=", "<"].map((int) => <Button key={int} onClick={this.handleInputClick}>{int}</Button>)}
        </div>
        </div>
      </main> 
    );
  }
}
export default App;
