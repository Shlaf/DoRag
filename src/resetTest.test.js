import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';



describe("clear", ()=>{
  it('handles clear button', () => {
    const component  = renderer.create(<App />);
    component.getInstance().handleInputClick(100);
    let clear = component.toJSON();
    expect(clear).toMatchSnapshot();

    component.getInstance().handelClear();
    clear = component.toJSON();    
    expect(clear).toMatchSnapshot();
  })
})
