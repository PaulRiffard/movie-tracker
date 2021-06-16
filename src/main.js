import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import './index.css'
import './registerServiceWorker'
Vue.use(Vuex)
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
