import React, { Component } from 'react';

class Button extends Component {

  BubbleClick = () => {
      this.props.onClick(this.props.children)
  }

  addClass() {
    let classList = this.props.children === 0 ? "zero" : null;
    if (this.props.children === this.props.math) {
      classList = classList + " selected";
    }
    return classList;
  }
  
  render() {

    return (
      <button className={this.addClass()} onClick={this.BubbleClick}>
        {this.props.children}
      </button>
    );
  }
}
export default Button;
