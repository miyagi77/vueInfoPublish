import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router'
import store from './store'
import axios from 'axios'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.moment = Moment
Vue.use(Elementui)
Vue.use($)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
