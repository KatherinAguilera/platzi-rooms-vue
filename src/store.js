import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from './data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    user: null,
    authId:'38St7Q8Zi2N1SPa5ahzssq9kbyp1',
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
    authUser: state => state.users[state.authId],
  },
});
