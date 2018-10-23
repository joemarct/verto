import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    userKey: ""
  },
  actions: {
    save({
      commit
    }, key) {
      commit("save", key);
    }
  },
  mutations: {
    save(state, key) {
      state.userKey = key;
    }
  }
})
