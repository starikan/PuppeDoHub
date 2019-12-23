import Vue from 'vue';
import Vuex from 'vuex';
import ppd from './modules/ppd';
import viewState from './modules/viewState';
import modulesHooks from './plugins/hooks_plugin';

Vue.use(Vuex);

const vuexData = {
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    ppd,
    viewState,
  },
  plugins: [modulesHooks],
};

const mainStore = new Vuex.Store(vuexData);

export default mainStore;
