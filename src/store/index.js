import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  user: {}, // 用户信息
  isLogin: false, // 登录状态
  // 地址列表
  addressLists: [],
  selectFoods: [], // 购物车
  shop: {},
  orders: [] // 订单列表
}

export default new Vuex.Store({state, actions, mutations})
