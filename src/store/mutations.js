import { FETCH_USER } from './constant'

export default {
  [FETCH_USER](state, payload) {
    state.user = payload.user
    state.isLogin = payload.isLogin
  }
}
