import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
});
