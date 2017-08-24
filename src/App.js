import React, { Component } from 'react';
import Button from "./components/button";
import Addition from "./functions/addition";
import Subtract from "./functions/subtract";
// import Multiply from "./functions/multiply";
// import Divide from "./functions/divide";

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

  handleInputClick = (input) => {

    if (typeof input === "number") {

      if (this.state.resetNext) {
        // reset input if resetNext = true
        this.setState({input: input.toString(), resetNext: false});
      } else {
        // Concatenate input string
        this.setState({input : this.state.input + input.toString()});
      };
     

    } else if (input === "c") {
      // If user input C
      this.handlClear();

    } else if (input === "=") {
      // If user input =
      this.handelMath(this.state.math);
      this.setState({
        firstEntry: true,
        sum: null,
        math: "=",
        resetNext: true
      });

    } else if (input === "<") {
      // If user input < (backspace)
      this.handlBackspace();

    } else {
      // If user input +, -, *, /...
      this.setState({resetNext: true});
      this.handelMath(input);
    }
  }

  // ---------------------
  // Reset the state, clear cal
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

  handelMath(input) {

    if (this.state.firstEntry) {
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
        default:
          break;
      };
    }

  }

  render() {
    return (
      <main>
      <div className="calculatorz">
        <form>
          <input type="text" name="value" id="value" value={this.state.input}/>
        </form>
        <div>
          {[1, 2, 3, 4, 5, 6, 7 ,8, 9, 0, "(-)", "+", "-", "c", "=", "<"].map((int) => <Button key={int} onClick={this.handleInputClick}>{int}</Button>)}
        </div>
        </div>
      </main> 
    );
  }
}
export default App;
