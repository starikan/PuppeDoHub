const ppd = require('PuppeDo');

const _ = require('lodash');
const WebSocket = require('ws');
var express = require('express');
const yaml = require('js-yaml');

let eventsOn = {
  run_test: async ({ args, socket }) => {
    await ppd.main(args, socket);
  },
  fetch_struct: async ({ args, socket }) => {
    await ppd.fetchStruct(args, socket);
  },
  fetch_available_tests: async ({ args, socket }) => {
    await ppd.fetchAvailableTests(args, socket);
  },
};

function runWsServer() {
  const app = express();
  app.use(express.static(__dirname + '/'));
  app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  app.listen(3002, () => console.log('listening on http://localhost:3002/'));

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
      const args = _.get(incomeData, 'args');
      const params = _.get(incomeData, 'params');
      const funcOn = _.get(eventsOn, _.get(incomeData, 'message'));
      if (funcOn) {
        await funcOn({
          envsId,
          args,
          params,
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
}

if (!module.parent) {
  runWsServer();
} else {
  module.exports = {
    runWsServer,
  };
}
