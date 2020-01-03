let websocket;

// INIT EVENTS LISTENERS
function init() {
  document.getElementById('runServer').addEventListener('click', runServerClick);
  document.getElementById('argsInit').addEventListener('click', argsInitClick);
  document.getElementById('getAllTestsData').addEventListener('click', getAllTestsDataClick);
}
window.addEventListener('load', init);

function writeToScreen(message) {
  const pre = document.createElement('pre');
  pre.style.wordWrap = 'break-word';
  pre.innerHTML = message;

  const output = document.getElementById('output');
  output.appendChild(pre);
}

// EVENTS

async function runServerClick(event) {
  function testWebSocket(wsUri) {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      writeToScreen('CONNECTED');
    };
    websocket.onclose = function(evt) {
      writeToScreen('DISCONNECTED');
    };
    websocket.onmessage = function(evt) {
      writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
    };
    websocket.onerror = function(evt) {
      writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    };
  }

  testWebSocket('ws://127.0.0.1:3001/');
}

async function argsInitClick(event) {
  const args = {
    PPD_ROOT: 'tests',
    PPD_ENVS: 'mainEnv',
    PPD_TESTS: 'main',
    PPD_DEBUG_MODE: 'true',
  };

  const data = JSON.stringify({ data: args, method: 'argsInit' });
  writeToScreen('SENT: ' + data);
  websocket.send(data);
}

async function getAllTestsDataClick(event) {
  const data = JSON.stringify({ method: 'getAllTestsData' });
  writeToScreen('SENT: ' + data);
  websocket.send(data);
}
