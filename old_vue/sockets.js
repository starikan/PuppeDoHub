let app = new Vue({
  el: '#main',
  data: function() {
    return {
      configs: {},
      currConfig: {},
      servers: [],
    };
  },
  mounted() {
    let self = this;
    fetch(`.\\data\\configs.yaml`, { method: 'GET' })
      .then(response => response.text())
      .then(res => {
        self.configs = jsyaml.load(res);
      });
    fetch(`.\\data\\servers.yaml`, { method: 'GET' })
      .then(response => response.text())
      .then(res => {
        self.servers = jsyaml.load(res);
      });
  },
  methods: {
    isCurrentConfig: function(name) {
      return _.get(this.currConfig, 'name') === name;
    },

    runConfig: async function(name) {
      const config = _.get(this.configs, name);
      const ppdConfig = _.get(this.configs, [name, 'ppdConfig']);
      if (!ppdConfig || config.socket) {
        //TODO: 2019-06-10 S.Starodubov ERROR
        return;
      }
      ppdConfig.name = name;
    },

    selectConfig: function(name) {
      let config = _(this.configs).find(v => v.name === name);
      if (config) {
        this.currConfig = config;
      }
    },

    startSocket: function(name, { host = '127.0.0.1', port = '3001' } = {}) {
      let self = this;

      if (self.servers[name] && self.servers[name].socket) {
        //TODO: 2019-06-11 S.Starodubov toast
        return;
      }

      let socket = new WebSocket(`ws://${host}:${port}/`);
      socket.onerror = function(event) {
        console.log(event, 'error');
      };
      socket.onopen = function(event) {
        console.log(event, 'websocket connection open');
        Vue.set(self.servers[name], 'socket', socket);
        // socket.send(JSON.stringify({ args: ppdConfig, method: 'createEnvs' }));
      };
      socket.onmessage = function(event) {
        // let data = jsyaml.load(event.data);
        // if (data.type === 'createEnvs') {
        // Vue.set(self.configs[config.name], 'envsId', data.envsId);
        // }
        console.log(data);
      };
      socket.onclose = function(event) {
        self.servers[name].socket = null;
        console.log(event, 'close');
      };
      // return socket;
    },

    sendSocket: function(config, method) {
      if (!config.socket) {
        console.log('Run socket connection first');
        return;
      }
      if (!method) {
        console.log(`Unknown method: ${method}`);
        return;
      }
      console.log(`Посылаем ${method} на сервер`, config);
      config.socket.send(JSON.stringify({ args: config.ppdConfig, method, envsId: config.envsId }));
    },
  },
});
