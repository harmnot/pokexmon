import Vue from 'vue';
import swal from 'sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './API/backend';
import 'bootstrap';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$swal = swal;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
