let app = new Vue({
  el: '#main',
  data: function() {
    return {
      configs: [],
      currConfig: {},
      socketServers: [],
    };
  },
  mounted() {
    let self = this;
    fetch(`.\\data\\configs.yaml`, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(res => {
        self.configs = jsyaml.load(res);
      });
  },
  methods: {
    isCurrentConfig: function(name) {
      return _.get(this.currConfig, 'name') === name;
    },

    showConfigs: function() {
      console.log(this.configs);
      console.log(this.currConfig);
    },

    runConfig: async function(name) {
      const config = _.get(this.configs, name);
      const ppdConfig = _.get(this.configs, [name, 'ppdConfig']);
      if (!ppdConfig || config.socket) {
        //TODO: 2019-06-10 S.Starodubov ERROR
        return;
      }
      ppdConfig.name = name;
      const socket = await this.startSocket({ config, ppdConfig });
      Vue.set(this.configs[name], 'isConnected', socket ? true : false);
      Vue.set(this.configs[name], 'socket', socket);
    },

    selectConfig: function(name) {
      let config = _(this.configs).find(v => v.name === name);
      if (config) {
        this.currConfig = config;
      }
    },

    startSocket: function({ config, ppdConfig, server = '127.0.0.1:3001' } = {}) {
      let self = this;
      let socket = new WebSocket(`ws://${server}/`);
      socket.onerror = function(event) {
        console.log(event, 'error');
      };
      socket.onopen = function(event) {
        console.log(event, 'websocket connection open');
        socket.send(JSON.stringify({ args: ppdConfig, method: 'initEnv' }));
      };
      socket.onmessage = function(event) {
        let data = jsyaml.load(event.data);
        if (data.type === 'initEnv') {
          Vue.set(self.configs[config.name], 'envsId', data.envsId);
        }
        console.log(data);
      };
      socket.onclose = function(event) {
        console.log(event, 'close');
      };
      return socket;
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
      config.socket.send(JSON.stringify({ args: config.ppdConfig, method, envsId: config.envsId }));
    },
  },
});
