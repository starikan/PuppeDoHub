let socket = new WebSocket('ws://' + window.location.host + '/');

socket.onerror = m => console.log(m, "error");

socket.onopen = m => console.log(m, "websocket connection open");

socket.onmessage = event => {
  let data = JSON.parse(event.data);
  console.log(data)
};

let init_test = () => {
  console.log("Start test");
  socket.send(JSON.stringify({
    message: 'init_test',
    payload: {
      // envsId,
      test: 'testGlob',
      testsFolder: 'settings',
      envs: ["settings/envCloud.yaml"],
    }
  }));
}