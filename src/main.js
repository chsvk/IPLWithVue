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
 // Insert Config File here
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
