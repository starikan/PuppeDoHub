const _ = require('lodash');
const CircularJSON = require('circular-json');
const puppedo = require('PuppeDo');
var path = require('path');
var express = require('express');

let sockets = {};

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
  init_test: async ({
    payload,
    socket
  }) => {
    try {
      let response = {};
      try {
        if (!_.get(socket, 'envsId')) {
          socket.ppd = puppedo.env();
          await socket.ppd.envs.init(payload, false);
          socket.envsId = _.get(socket.ppd, 'envsId');
          socket.envs = _.get(socket.ppd, 'envs');
          socket.log = _.get(socket.ppd, 'log');
          console.log('init_test', payload);
          console.log('createEnvs', socket);
        }
        response = {
          message: 'init_test',
          payload: {
            envsId: socket.envsId,
            envs: socket.envs
          }
        };
      } catch (error) {
        console.log(error);
        response = {
          message: 'error',
          payload: {
            error: error,
            stack: _.get(error, 'stack'),
          }
        }
      } finally {
        socket.send(CircularJSON.stringify(response));
      }
    } catch (err) {
      console.log(err)
    }
  },
  get_json: ({
    payload,
    socket
  }) => {

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
  }
}

function runWsServer() {
  const app = express();
  let ws = require('express-ws')(app);

  app.use(express.static(__dirname + '/static'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.ws('/', (socket, req) => {
    console.log('websocket connection');

    // console.log(app.listeners())

    socket.onmessage = async event => {
      const incomeData = JSON.parse(event.data);
      const payload = _.get(incomeData, 'payload');
      const funcOn = _.get(eventsOn, _.get(incomeData, 'message'));
      if (funcOn) {
        await funcOn({
          payload,
          socket
        });
      }
    };

    socket.onclose = () => {};
    socket.onerror = () => {};
    socket.onopen = () => {};
  });

  app.listen(3001, () => console.log('listening on http://localhost:3001/'));
}

if (!module.parent) {
  runWsServer();
} else {
  module.exports = { runWsServer };
}