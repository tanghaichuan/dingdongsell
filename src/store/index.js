import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  user: {}, // 用户信息
  isLogin: false // 登录状态
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
