import React, { Component } from 'react';
import Addition from "./functions/addition";
import Subtract from "./functions/subtract";
import Multiply from "./functions/multiply";
import Divide from "./functions/divide";
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
      <div className="calculatorz">
        <form>
          <input type="text" name="value" id="value"/>
        </form>
        </div>
      </main> 
    );
  }
}
export default App;
