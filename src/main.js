import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import { setUpInterceptors } from './helpers/interceptors'

// Set up axios interceptors (e.g for auth bearer token)
setUpInterceptors()

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
