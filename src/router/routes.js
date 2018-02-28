import App from '../App'
import Login from '@/page/login'
import NotFound from '@/components/NotFound'
import Home from '@/page/home'
import Order from '@/page/order'
import Profile from '@/page/profile'
import ProfileInfo from '@/page/profile/info'
import address from '@/page/profile/address'
import addAddress from '@/page/profile/addAddress'
import shop from '@/page/shop'
import shopDetails from '@/page/shop/shopDetails'

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
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
      },
      {
        path: 'profile/info',
        name: 'profileInfo',
        component: ProfileInfo
      },
      {
        path: '/profile/address',
        name: 'profileAddress',
        component: address,
        meta: {
          validLogin: true
        }
      },
      {
        path: 'profile/address/add',
        name: 'addAddress',
        component: addAddress,
        meta: {
          title: '添加地址',
          validLogin: true
        }
      },
      {
        path: 'profile/address/edit/:addressId',
        name: 'editAddress',
        component: addAddress,
        meta: {
          title: '编辑地址',
          validLogin: true
        }
      },
      {
        path: 'shop/:id',
        name: 'shop',
        component: shop
      },
      {
        path: 'shop/details/:id',
        name: 'shopDetails',
        component: shopDetails
      }
    ]
  },
  {
    name: '404',
    path: '*',
    component: NotFound
  }
]
