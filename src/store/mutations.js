import * as constant from './constant'

export default {
  [constant.FETCH_USER](state, payload) {
    state.user = payload.user
    state.isLogin = payload.isLogin
  },
  [constant.ADD_ADDRESS](state, payload) {
    state
      .addressLists
      .push(payload)
  },
  [constant.DEL_ADDRESS](state, payload) {
    state.addressLists = state
      .addressLists
      .filter(item => item.id !== payload)
  },
  [constant.SET_SHOP](state, payload) {
    state.shop = payload
  },
  [constant.ADD_ORDER](state, payload) {
    state
      .orders
      .push(payload)
  }
}
