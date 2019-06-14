import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    // Logica con vuex del modal
    modals: {
      login: false,
    },
  },
  // hacer la modificacion del state
  mutations: {
    SET_MODAL_STATE: (state, { name, value }) => {
      // de acuerdo al nombre del modal modifique su valor
      state.modals[name] = value;
    },
  },
  actions: {
    TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
      commit('SET_MODAL_STATE', { name, value });
    },
  },
  getters: {
    // retornar obtener los datos del state
    modals: state => state.modals,
  },
});
