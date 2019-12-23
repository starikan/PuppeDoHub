import Vue from 'vue';
import Vuex from 'vuex';
import servers from './modules/servers';
import viewState from './modules/viewState';
import modulesHooks from './plugins/hooks_plugin';

Vue.use(Vuex);

const vuexData = {
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    servers,
    viewState,
  },
  plugins: [modulesHooks],
};

const mainStore = new Vuex.Store(vuexData);

export default mainStore;
