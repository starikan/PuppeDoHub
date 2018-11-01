let envsId;

let socket = new WebSocket('ws://' + window.location.host + '/');
socket.addEventListener('error', function (m) {
  console.log(m, "error");
});
socket.addEventListener('open', function (m) {
  console.log(m, "websocket connection open");
});
socket.onmessage = function (event) {
  let data = JSON.parse(event.data);
  let message = _.get(data, 'message');
  let payload = _.get(data, 'payload');
  let envsId = _.get(data, 'envsId');

  console.log(data)

};

let init_test = () => {
  console.log("Start test");
  socket.send(JSON.stringify({
    message: 'init_test',
    payload: {
      envsId,
      test: 'testGlob',
      envs: ["settings/settings/envCloud.yaml"],
    }
  }));
}