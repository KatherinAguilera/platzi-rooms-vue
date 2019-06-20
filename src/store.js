import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
// import sourceData from './data.json';
import countObjectProperties from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ...sourceData,
    authId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1',
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
    SET_ROOM(state, { newRoom, roomId }) {
      // asignar el valor nuevo hacia el obj que ya tenemos
      // vue.set push ya que arreglos y objetos no funcionan dinamicamente de manera reactiva
      Vue.set(state.rooms, roomId, newRoom);
    },
    // agregar la nueva room y asignarla al user
    APPEND_ROOM_TO_USER(state, { roomId, userId }) {
      Vue.set(state.users[userId].rooms, roomId, roomId);
    },
    SET_ITEM(state, { item, id, resource }) {
      const newItem = item;
      newItem['.key'] = id;
      Vue.set(state[resource], id, newItem);
    },
    SET_AUTHID(state, id) {
      state.authId = id;
    },
  },
  actions: {
    TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
      commit('SET_MODAL_STATE', { name, value });
    },
    CREATE_ROOM: ({ state, commit }, room) => {
      const newRoom = room;
      const roomId = `room${Math.random()}`;
      newRoom['.key'] = roomId;
      newRoom.userId = state.authId;

      commit('SET_ROOM', { newRoom, roomId });
      commit('APPEND_ROOM_TO_USER', { roomId, userId: newRoom.userId });
    },
    FETCH_ROOMS: ({ state, commit }, limit) => new Promise((resolve) => {
      let instance = firebase.database().ref('rooms');
      if (limit) {
        // los primeros que se encuentre en ese limite
        instance = instance.limitToFirst(limit);
      }
      instance.once('value', (snapshot) => {
        const rooms = snapshot.val();
        Object.keys(rooms).forEach((roomId) => {
          const room = rooms[roomId];
          commit('SET_ITEM', { resource: 'rooms', id: roomId, item: room });
        });
        resolve(Object.values(state.rooms));
      });
    }),
    FETCH_USER: ({ state, commit }, { id }) => new Promise((resolve) => {
      firebase.database().ref('users').child(id).once('value', (snapshot) => {
        commit('SET_ITEM', { resource: 'users', id: snapshot.key, item: snapshot.val() });
        resolve(state.users[id]);
      });
    }),
  },
  getters: {
    // retornar obtener los datos del state
    modals: state => state.modals,
    authUser: state => state.users[state.authId],
    rooms: state => state.rooms,
    userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
  },
});
