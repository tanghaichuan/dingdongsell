import server from './server'

/**
 * getTest
 */

export const getTest = () => server('/api/test')

/**
 * 获取商品劣币哦啊
 */
export const getGoodsList = () =>
  server(
    'https://www.easy-mock.com/mock/5a4c9a6281bb592653f70c6b/example/getGoodLists'
  )
