import React, { Component } from 'react';
import Button from "./components/button";
import Addition from "./functions/addition";
import Subtract from "./functions/subtract";
import Multiply from "./functions/multiply";
import Divide from "./functions/divide";

import './App.css';

class App extends Component {
  state = {
    input: ""
  }

  handleInputClick = (input) => {
    this.setState({input})
  }

  render() {
    return (
      <main>
      <div className="calculatorz">
        <form>
          <input type="text" name="value" id="value" value={this.state.input}/>
        </form>
        <div>
          {[1, 2, 3, 4, 5, 6, 7 ,8, 9, 0].map((int) => <Button key={int} onClick={this.handleInputClick}>{int}</Button>)}
        </div>
        </div>
      </main> 
    );
  }
}
export default App;
