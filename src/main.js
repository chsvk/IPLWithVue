import Vue from 'vue'
import App from './App.vue'
import router from './router'

import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2';
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
 
Vue.use(VueSweetalert2, options);

firebase.initializeApp({
  apiKey: "AIzaSyC_I2CKy6JFrWb7yCh4lN0B45zN3vgE7RY",
    authDomain: "iplwithvue.firebaseapp.com",
    databaseURL: "https://iplwithvue.firebaseio.com",
    projectId: "iplwithvue",
    storageBucket: "iplwithvue.appspot.com",
    messagingSenderId: "972348038516"
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
