import server from './server'

/**
 * getTest
 */

export const getTest = () => server('/api/test')

/**
 * 获取商品列表
 */
// export const getGoodsList = (data) =>
// server('https://www.easy-mock.com/mock/5a4c9a6281bb592653f70c6b/example/getGo
// o dLists', data, 'post')
export const getGoodsList = (data) => server('/goodsInfo/queryGoodsInfoList.do', data, 'post')

/**
 * 获取店铺评价列表
 */
export const queryRatingList = data => server('https://easy-mock.com/mock/5a4c9a6281bb592653f70c6b/example/queryRatingList', data, 'post')

/**
 * 获取用户位置信息
 */
export const queryPosition = () => server('http://60.205.184.200:3000/api/v1/queryPosition')

/**
 * 登陆
 */
export const login = (data) => server('/userInfo/editUserInfo.do', data, 'post')

/**
 * 添加地址
 */
export const editAddress = (data) => server('/addressInfo/editAddressInfo.do', data, 'post')

/**
 * 添加地址
 */
export const queryAddress = (data) => server('/addressInfo/queryAddressInfoList.do', data, 'post')

/**
 * 首页推荐位商家列表
 */
export const queryShopList = (data) => server('/businessInfo/queryBusinessInfoList.do', data, 'post')

/**
 * 下单
 */
export const payOrder = (data) => server('/orderInfo/editOrderInfo.do', data, 'post', 'params')

/**
 * 查询订单列表
 */
export const queryOrderLists = (data) => server('/orderInfo/queryOrderInfoList.do', data, 'post')

/**
 * 查询用户列表
 */
export const queryAllUsers = () => server('/userInfo/queryUserInfoList.do')

/**
 * 商家模糊搜索
 */
export const queryShopByName = (data) => server('/businessInfo/searchBusinessInfoByContent.do', data, 'post')