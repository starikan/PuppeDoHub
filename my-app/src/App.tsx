import React from 'react';
import './App.css';

type MyProps = { test: string };
type MyState = { buttons: Array<{ id: string; name: string }> };

class App extends React.Component<MyProps, MyState> {
  styles: { [key: string]: string } = {
    border: '2px solid red',
  };

  state: MyState = {
    buttons: [
      { id: 'runServer', name: 'runServer' },
      { id: 'argsInit', name: 'argsInit' },
      { id: 'getAllTestsData', name: 'getAllTestsData' },
      { id: 'createEnvs', name: 'createEnvs' },
      { id: 'setCurrentTest', name: 'setCurrentTest' },
      { id: 'runCurrentTest', name: 'runCurrentTest' },
    ],
  };

  render() {
    return (
      <div className="App">
        {/* {this.props.test}
        {this.props.children} */}
        <button id={this.state.buttons[0].id}>{this.state.buttons[0].name}</button>
        <button id={this.state.buttons[1].id}>{this.state.buttons[1].name}</button>
        <button id={this.state.buttons[2].id}>{this.state.buttons[2].name}</button>
        <button id={this.state.buttons[3].id}>{this.state.buttons[3].name}</button>
        <button id={this.state.buttons[4].id}>{this.state.buttons[4].name}</button>
        <button id={this.state.buttons[5].id}>{this.state.buttons[5].name}</button>
      </div>
    );
  }
}

export default App;
