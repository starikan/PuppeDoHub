const _ = require('lodash');
const ppd = require('PuppeDo');
const WebSocket = require('ws');
var express = require('express');
const yaml = require('js-yaml');

let eventsOn = {
  run_test: async ({ payload, socket }) => {
    await ppd.main(payload, socket);
  },
  get_all_tests: async data => {},
};

function runWsServer() {
  const app = express();
  app.use(express.static(__dirname + '/'));

  const wss = new WebSocket.Server({ port: 3001 });
  wss.getUniqueID = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4();
  };
  wss.on('connection', ws => {
    console.log(ws, wss);
    ws.id = wss.getUniqueID();
    ws.sendYAML = function(data) {
      return this.send.call(this, yaml.dump(data, { lineWidth: 1000, indent: 2 }));
    };
    ws.onmessage = async function(event) {
      const incomeData = JSON.parse(event.data);
      const envsId = _.get(incomeData, 'envsId');
      const payload = _.get(incomeData, 'payload');
      const funcOn = _.get(eventsOn, _.get(incomeData, 'message'));
      if (funcOn) {
        await funcOn({
          envsId,
          payload,
          socket: this,
        });
      }
    };
    ws.onclose = () => {
      console.log('Close');
    };
    ws.onerror = () => {};
    ws.onopen = () => {};
  });

  app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(3002, () => console.log('listening on http://localhost:3002/'));
}

if (!module.parent) {
  runWsServer();
} else {
  module.exports = {
    runWsServer,
  };
}
