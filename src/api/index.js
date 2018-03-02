import server from './server'

/**
 * getTest
 */

export const getTest = () => server('/api/test')

/**
 * 获取商品劣币哦啊
 */
export const getGoodsList = (data) => server('https://www.easy-mock.com/mock/5a4c9a6281bb592653f70c6b/example/getGoodLists', data, 'post')

/**
 * 获取店铺评价列表
 */
export const queryRatingList = data => server('https://easy-mock.com/mock/5a4c9a6281bb592653f70c6b/example/queryRatingList', data, 'post')
