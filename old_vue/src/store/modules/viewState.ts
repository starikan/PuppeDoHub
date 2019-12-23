import _mut from '../_mut';

let state = {};
let mutations = {};
let actions = {};
let hooks = {};

export default {
  namespaced: true,
  state: state,
  mutations: {
    ..._mut(state),
    ...mutations,
  },
  actions: actions,
  hooks: hooks,
};
