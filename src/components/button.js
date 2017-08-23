import React, { Component } from 'react';

class Button extends Component {
  handleClick = () => {
      this.props.onClick(this.props.children)
  }  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
export default Button;