import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/vant';
import 'lib-flexible/flexible.js';
import '@/utils/filter';
import '@/assets/styles/index.scss';
import '@/assets/styles/home.scss';


import { $cdn } from '@/config';
// import Qs from 'qs';
// window.Qs = Qs;
// window.QsQuery = (url = window.location.search.slice(1)) => Qs.parse(url);
// Vue.prototype.$Qs = Qs;
window.$cdn = $cdn;
Vue.prototype.$cdn = $cdn;

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
