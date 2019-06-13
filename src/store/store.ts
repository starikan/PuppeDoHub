import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const ppd = {
  namespaced: true,
  state: {
    servers: {
      local: {
        host: '127.0.0.1',
        port: '3001',
      },
    },
  },
  mutations: {},
  getters: {},
  actions: {},
};

const viewState = {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {},
};

const localStorage = {
  namespaced: true,
  state: {
    isLocalPPDRunnable: true,
  },
  mutations: {},
  getters: {},
  actions: {},
};

const store = new Vuex.Store({
  modules: {
    ppd,
    viewState,
    localStorage,
  },
  state: {
    count: 10,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;
