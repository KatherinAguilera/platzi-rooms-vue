import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBd3WrOq-y6UMjdXO5gfj8-sAX077JMbEc',
  authDomain: 'rooms-e3fb0.firebaseapp.com',
  databaseURL: 'https://rooms-e3fb0.firebaseio.com',
  projectId: 'rooms-e3fb0',
  storageBucket: 'rooms-e3fb0.appspot.com',
  messagingSenderId: '671700275024',
  appId: '1:671700275024:web:2add61d02d78de0f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    if (store.state.authId) {
      this.$store.dispatch('FETCH_USER', { id: store.state.authId });
    }
  },
}).$mount('#app');
