import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons/Buttons';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        PuppeDo
        <Buttons></Buttons>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'));
serviceWorker.unregister();
