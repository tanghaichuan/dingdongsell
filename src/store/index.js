import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  user: {}, // 用户信息
  isLogin: false, // 登录状态
  // 地址列表
  addressLists: [
    {
      id: '1',
      name: '张三',
      tel: '13000000000',
      address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
    }, {
      id: '2',
      name: '李四',
      tel: '1310000000',
      address: '浙江省杭州市拱墅区莫干山路 50 号'
    }
  ],
  selectFoods: [], // 购物车
  shop: {},
  orders: [] // 订单列表
}

export default new Vuex.Store({state, actions, mutations})
