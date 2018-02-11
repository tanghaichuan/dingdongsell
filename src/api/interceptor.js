/**
 * 响应拦截器
 * @param {Object} response `Axios`响应对象
 * @returns {Object|Promise} 返回配置对象本身或者返回一个Promise对象，
 *                           参见{@link https://github.com/axios/axios Axios}官网
 */

export function responseInterceptor(response) {
  // if (response.data.CODE === 'NOLOGIN') {
  //   localStorage.removeItem('cnpost')
  //   sessionStorage.removeItem(STORE_KEY)
  //   window.location.href = response.data.URL
  // }
  return response
}

/**
 * 响应错误处理
 * @param {Object} error `Axios`错误对象
 * @returns {Promise} 返回Promise对象
 */
export function handleResponseError(error) {
  return Promise.reject(error)
}
