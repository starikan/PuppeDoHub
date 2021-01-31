import React from 'react';
import ReactDOM from 'react-dom';
import ArgsForm from './ArgsForm';
import Buttons from './Buttons/Buttons';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Tree from './Tree/Tree';
import { WebSocketDemo } from './WebSocketDemo.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        PuppeDo
        <Buttons></Buttons>
        <ArgsForm></ArgsForm>
        <WebSocketDemo></WebSocketDemo>
        <Tree></Tree>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'));
serviceWorker.unregister();
