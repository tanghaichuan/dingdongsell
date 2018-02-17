// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'vant/lib/vant-css/index.css'
import './assets/styles/index.less'

Vue.use(Vant)

sync(store, router)

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
