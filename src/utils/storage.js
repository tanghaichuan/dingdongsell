/**
 * localStorage,sessionStorage操作方法
 * storage.local.get(key)
 * storage.local.set(key,data)
 * storage.session.get(key)
 * storage.session.get(key,data)
 */

export const local = {
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set(key, data) {
    return localStorage.setItem(key, JSON.stringify(data))
  },
  remove(key) {
    return localStorage.removeItem(key)
  },
  clearAll() {
    return localStorage.clear()
  }
}

export const session = {
  get(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  set(key, data) {
    return sessionStorage.setItem(key, JSON.stringify(data))
  },
  remove(key) {
    return sessionStorage.removeItem(key)
  },
  clearAll() {
    return sessionStorage.clear()
  }
}