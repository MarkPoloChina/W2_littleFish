// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
window.requestUrl = 'http://planeter.icu:9000'
window.OKrsp = '000200'
window.repName = '100100'
window.wrongLogin = '000999'
window.banned = '100600'
window.notFound = '200100'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
