import App from '../App'
import Login from '@/page/login'
import NotFound from '@/components/NotFound'
import Home from '@/page/home'
import Order from '@/page/order'
import ConfirmOrder from '@/page/order/confirmOrder'
import Profile from '@/page/profile'
import ProfileInfo from '@/page/profile/info'
import Address from '@/page/profile/address'
import AddAddress from '@/page/profile/addAddress'
import Shop from '@/page/shop'
import ShopDetails from '@/page/shop/shopDetails'
import Search from '@/page/search'

export default[
  {
    path : '/',
    component : App,
    children : [
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
      }, {
        path: 'checkout',
        name: 'ConfirmOrder',
        component: ConfirmOrder,
        meta: {
          validLogin: true
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
      // 个人信息详情页
      {
        path: 'profile/info',
        name: 'profileInfo',
        component: ProfileInfo
      },
      // 个人收货地址管理页
      {
        path: '/profile/address',
        name: 'profileAddress',
        component: Address,
        meta: {
          validLogin: true
        }
      }, {
        path: 'profile/address/add',
        name: 'addAddress',
        component: AddAddress,
        meta: {
          title: '添加地址',
          validLogin: true
        }
      }, {
        path: 'profile/address/edit/:addressId',
        name: 'editAddress',
        component: AddAddress,
        meta: {
          title: '编辑地址',
          validLogin: true
        }
      },
      // 店铺商品列表页
      {
        path: 'shop/:id',
        name: 'shop',
        component: Shop
      },
      // 店铺详情页
      {
        path: 'shop/details/:id',
        name: 'shopDetails',
        component: ShopDetails
      },
      // 主页商品/店铺搜索页
      {
        path: 'search',
        name: 'search',
        component: Search
      }
    ]
  }, {
    name : '404',
    path : '*',
    component : NotFound
  }
]
