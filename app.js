const _ = require('lodash');
// const CircularJSON = require('circular-json');
const puppedo = require('PuppeDo');
// const path = require('path');
const WebSocket = require('ws');
var express = require('express');

// let instances = {};

let eventsOn = {
  // create_envs: async (data) => {
  //   const { envsId, envs, log } = require('./env')();
  //   await envs.init(args);
  //   this.ppd = Object.assign({}, {envsId, envs, log});
  //   this.emit({envsId});
  // },
  // get_all_tests: async (data) => {
  //   const tests = await getTestsFiles();
  //   this.emit(tests);
  // },
  run_test: async ({
    payload,
    envsId,
    socket
  }) => {
    debugger
    await puppedo.main(payload, socket);
    socket.send(JSON.stringify({
      message: "Done"
    }))
  },
  // init_test: async ({
  //   payload,
  //   envsId,
  //   socket
  // }) => {
  //   try {
  //     let response = {};
  //     try {
  //       let instance = {}
  //       if (!_.get(instances, envsId)) {
  //         instance.ppd = puppedo.env();
  //         await instance.ppd.envs.init(payload, false);
  //         instance.envsId = _.get(instance.ppd, 'envsId');
  //         instance.envs = _.get(instance.ppd, 'envs');
  //         instance.log = _.get(instance.ppd, 'log');
  //         instances[instance.envsId] = instance;
  //         console.log('init_test', payload);
  //         console.log('createEnvs', instance);
  //       } else {
  //         instance = _.get(instances, envsId);
  //       }
  //       response = {
  //         message: 'init_test',
  //         payload: {
  //           envsId: _.get(instance, 'envsId'),
  //           envs: _.get(instance, 'envs'),
  //         }
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       response = {
  //         message: 'error',
  //         payload: {
  //           error: error,
  //           stack: _.get(error, 'stack'),
  //         }
  //       }
  //     } finally {
  //       socket.send(CircularJSON.stringify(response));
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  // get_json: ({
  //   payload,
  //   socket
  // }) => {

  // try {
  //   let response = {};
  //   try {
  //     let envs = ;
  //     if (!envsId) {
  //       console.log('init_test', payload);
  //       let ppd = puppedo.env();
  //       await ppd.envs.init(payload, false);
  //       console.log('createEnvs', ppd);
  //       envsId = _.get(ppd, 'envsId');
  //       envs = _.get(ppd, 'envs');
  //       tests[envsId] = ppd;
  //     } else {
  //       envs = _.get(tests, [envsId, 'envs'], {});
  //     }
  //     response.message = 'init_test';
  //     response.envsId = envsId;
  //     response.payload = {
  //       envs: _.isObject(envs) ? _.omit(envs, ['init', 'log']) : {},
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     response.message = 'error';
  //     response.error = error;
  //     response.stack = _.get(error, 'stack');
  //   }

  //   socket.send(JSON.stringify(response));

  // } catch (err) {
  //   console.log(err)
  // }


  // try {
  //   console.log('get_json', this);
  //   let envs = _.get(this, "ppd.envs");
  //   const fullJSON = getFullDepthJSON({
  //     envs: envs,
  //     filePath: envs.get('args.testFile'),
  //   });
  //   console.log(fullJSON)
  //   this.emit('news', fullJSON);
  // } catch (err) {
  //   console.log(err)
  // }
  // }
}

function runWsServer() {
  const app = express();
  // let ws = require('express-ws')(app);

  app.use(express.static(__dirname + '/'));

  const wss = new WebSocket.Server({
    port: 3001
  });

  wss.getUniqueID = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
  };

  wss.on('connection', ws => {
    console.log(ws, wss);

    ws.id = wss.getUniqueID();

    ws.onmessage = async function (event) {
      const incomeData = JSON.parse(event.data);
      const envsId = _.get(incomeData, 'envsId');
      const payload = _.get(incomeData, 'payload');
      const funcOn = _.get(eventsOn, _.get(incomeData, 'message'));
      if (funcOn) {
        await funcOn({
          envsId,
          payload,
          socket: this
        });
      }
    };

    ws.onclose = () => {
      console.log('Close')
    };
    ws.onerror = () => {};
    ws.onopen = () => {};

    // sockets[ws.id] = ws;
  });

  app.get('/', (req, res) => {
    // console.log(wss.clients);
    // let allClients = [];
    // wss.clients.forEach(function each(client) {
    //   console.log(client)
    //   allClients.push(_.pick(client, ['id', 'readyState', 'envsId']))
    // if (client !== ws && client.readyState === WebSocket.OPEN) {
    //   client.send(data);
    // }
    // });
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.json(allClients);
    // console.log(app.listeners())

  });

  app.listen(3002, () => console.log('listening on http://localhost:3002/'));
}

if (!module.parent) {
  runWsServer();
} else {
  module.exports = {
    runWsServer
  };
}