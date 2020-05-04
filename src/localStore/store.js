import Vue from "vue";
import Vuex from "vuex";

import cards from "../moduleCard/store/index.js";
import modal from "../components/modals/store/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    cards,
    modal,
  },
});

export default store;
