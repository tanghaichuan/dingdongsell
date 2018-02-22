import * as constant from './constant'

export default {
  [constant.FETCH_USER](state, payload) {
    state.user = payload.user
    state.isLogin = payload.isLogin
  },
  [constant.ADD_ADDRESS](state, payload) {
    state.addressLists.push(payload)
  },
  [constant.DEL_ADDRESS](state, payload) {
    state.addressLists = state.addressLists.filter(item => item.id !== payload)
  }
}
