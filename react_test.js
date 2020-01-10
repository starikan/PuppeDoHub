'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props, context, updater) {
//     debugger;
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e('button', { onClick: () => this.setState({ liked: true }) }, 'Like');
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);

function Btn(props) {
  return <button id={props.id}>{props.name}</button>;
}

const App = (
  <div>
    <Btn id="runServer" name="runServer" />
    <Btn id="argsInit" name="argsInit" />
    <Btn id="getAllTestsData" name="getAllTestsData" />
    <Btn id="createEnvs" name="createEnvs" />
    <Btn id="setCurrentTest" name="setCurrentTest" />
    <Btn id="runCurrentTest" name="runCurrentTest" />
  </div>
);

ReactDOM.render(App, document.querySelector('#root'));
