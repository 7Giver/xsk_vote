import Vue from 'vue';
import App from './App.vue';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss';

Vue.use(ElementUI);

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config';
window.$cdn = $cdn;
Vue.prototype.$cdn = $cdn;

import '@/utils/filter';

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
