import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//TODO: 2019-06-13 S.Starodubov Modules
// State machite view
// PPD
// Local data

const store = new Vuex.Store({
  state: {
    count: 10,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

module.exports = store;