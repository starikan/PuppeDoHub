let app = new Vue({
  el: '#main',
  data: function() {
    return {
      configs: [],
      currConfig: {},
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
    runConfig: function(name) {
      _.forEach(this.configs, (val, key) => {
        if (key === name) {
          Vue.set(this.configs[key], 'isConnected', true);
          Vue.set(this.configs[key], 'socket', this.startSocket());
        }
      });
    },
    selectConfig: function(name) {
      let config = _(this.configs).find(v => v.name === name);
      if (config) {
        this.currConfig = config;
      }
    },
    onMessageSocket: function(event) {
      let data = jsyaml.load(event.data);
      console.log(data);
    },
    onOpenSocket: function(event) {
      console.log(event, 'websocket connection open');
    },
    onErrorSocket: function(event) {
      console.log(event, 'error');
    },
    onCloseSocket: function(event) {
      console.log(event, 'close');
    },
    startSocket: function() {
      let socket = new WebSocket(`ws://127.0.0.1:3001/`);
      socket.onerror = this.onErrorSocket;
      socket.onopen = this.onOpenSocket;
      socket.onmessage = this.onMessageSocket;
      socket.onclose = this.onCloseSocket;
      return socket;
    },

    runTest: function(config) {
      //TODO: 2019-05-20 S.Starodubov ошибку кинуть
      if (!config.socket) {
        console.log('Run socket connection first');
        return;
      }
      config.socket.send(
        JSON.stringify({
          message: 'run_test',
          args: config.ppd_config,
        }),
      );
    },

    fetchStruct: function(config) {
      //TODO: 2019-05-20 S.Starodubov ошибку кинуть
      if (!config.socket) {
        console.log('Run socket connection first');
        return;
      }
      config.socket.send(
        JSON.stringify({
          message: 'fetch_struct',
          args: config.ppd_config,
        }),
      );
    },
    fetchAvailableTests: function(config) {
      //TODO: 2019-05-20 S.Starodubov ошибку кинуть
      if (!config.socket) {
        console.log('Run socket connection first');
        return;
      }
      config.socket.send(
        JSON.stringify({
          message: 'fetch_available_tests',
          args: config.ppd_config,
        }),
      );
    },
  },
});
