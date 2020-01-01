const state = {};
let output, websocket;

const args = {
  PPD_ROOT: 'tests',
  PPD_ENVS: 'mainEnv',
  PPD_TESTS: 'main',
  PPD_DEBUG_MODE: 'true',
};

function init() {
  output = document.getElementById('output');

  document.getElementById('runServer').addEventListener('click', runServerClick);
  document.getElementById('argsInit').addEventListener('click', argsInitClick);
}

async function runServerClick(event) {
  testWebSocket('ws://127.0.0.1:3001/');
}

async function argsInitClick(event) {
  const data = JSON.stringify({ data: args, method: 'argsInit' });
  doSend(data);
}

function testWebSocket(wsUri) {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    onOpen(evt);
  };
  websocket.onclose = function(evt) {
    onClose(evt);
  };
  websocket.onmessage = function(evt) {
    onMessage(evt);
  };
  websocket.onerror = function(evt) {
    onError(evt);
  };
}

function onOpen(evt) {
  writeToScreen('CONNECTED');
}

function onClose(evt) {
  writeToScreen('DISCONNECTED');
}

function onMessage(evt) {
  writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
  websocket.close();
}

function onError(evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
  writeToScreen('SENT: ' + message);
  websocket.send(message);
}

function writeToScreen(message) {
  const pre = document.createElement('p');
  pre.style.wordWrap = 'break-word';
  pre.innerHTML = message;
  output.appendChild(pre);
}

window.addEventListener('load', init, false);
