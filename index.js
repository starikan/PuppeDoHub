const state = {};
let output;

function init() {
  testWebSocket('ws://127.0.0.1:3001/');
  output = document.getElementById('output');

  const runServer = document.getElementById('runServer');
  runServer.addEventListener('click', runServerClick);
}

async function runServerClick(event) {
  console.log(event);
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function testWebSocket(wsUri) {
  const websocket = new WebSocket(wsUri);
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
  doSend('WebSocket rocks');
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
