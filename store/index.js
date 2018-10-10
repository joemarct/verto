import Vue from "Vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userKey: ""
  }
});
export const actions = {
  save({ commit }, key) {
    commit("save", key);
  }
};
export const mutations = {
  save(state, key) {
    state.userKey = key;
  }
};

Vue.prototype.$store = store;
