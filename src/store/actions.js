import { FETCH_USER } from './constant'

// 获取用户身份
export function fetchUser({ commit }) {
  let user = sessionStorage.getItem('user')
  user = user ? JSON.parse(user) : null
  commit(FETCH_USER, { user, isLogin: true })
  //commit(FETCH_USER, { user, isLogin: !!user })
}
