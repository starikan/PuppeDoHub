import React from 'react';

type MyProps = {};
type MyState = { buttons: TButton[] };

type TButton = { id: string; name: string };

export default class Buttons extends React.Component<MyProps, MyState> {
  styles: React.CSSProperties = {
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

  clickButtonHandler = (v: TButton) => {
    console.log(v.id);
  };

  render() {
    return (
      <div>
        {this.state.buttons.map((v) => {
          return (
            <button id={v.id} onClick={this.clickButtonHandler.bind(null, v)}>
              {v.name}
            </button>
          );
        })}
      </div>
    );
  }
}
