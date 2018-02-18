import Main from '@/page/main'
import Home from '@/page/home'
import Order from '@/page/order'
import Profile from '@/page/profile'
import NotFound from '@/components/NotFound'

export default [
  {
    path: '/',
    component: Main,
    children: [
      // 外卖首页
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          active: 0
        }
      },
      // 订单页
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: {
          active: 1
        }
      },
      // 个人设置页
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {
          active: 2
        }
      }
    ]
  },
  {
    name: '404',
    path: '*',
    component: NotFound
  }
]
