import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import {Dialog} from 'vant'

Vue.use(Router)

const router = new Router({mode: 'history', routes})

function initDialog() {
  let $modal = document.querySelector('.van-modal')
  let $dialog = document.querySelector('.van-dialog')
  if ($modal && $dialog && $modal.style.display === 'none' && $dialog.style.display === 'none') {
    $modal.style.display = 'block'
    $dialog.style.display = 'block'
  }
}

router.beforeEach((to, from, next) => {
  router
    .app
    .$store
    .dispatch('fetchUser') // 从本地存储对象中获取登录信息
  if (to.meta.validLogin && !store.state.isLogin) {
    // 需要登录才能继续操作
    initDialog()
    Dialog
      .confirm({title: '未登录', closeOnClickOverlay: true, showCancelButton: false, confirmButtonText: '去登录'})
      .then(() => {
        next({path: '/login'})
      })
  } else {
    let $modal = document.querySelector('.van-modal')
    let $dialog = document.querySelector('.van-dialog')
    if ($modal && $dialog) {
      $modal.style.display = 'none'
      $dialog.style.display = 'none'
    }
    next()
  }
})

export default router
