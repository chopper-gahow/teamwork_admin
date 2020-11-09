import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
// axios.defaults.baseURL='http://47.102.107.15:6767'
axios.defaults.baseURL='http://localhost:6767'
axios.defaults.withCredentials = true; //配置为true
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
