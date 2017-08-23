import React, { Component } from 'react';
import addition from "./functions/addition";
import subtract from "./functions/subtract";
import multiply from "./functions/multiply";
import divide from "./functions/divide";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default App;
