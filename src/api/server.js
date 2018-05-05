import axios from 'axios'
import {isArray} from 'lodash'
import {baseURL} from './config'
import {responseInterceptor, handleResponseError} from './interceptor'
// import domains from './domains' axios拦截器
// axios.interceptors.request.use(responseInterceptor, handleResponseError)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURL
// axios.defaults.headers = {   'Accept':
// 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*
// /*;' +       'q=0.8' }

async function server(type, url, data, params) {
  type = type.toUpperCase()
  url = baseURL + url
  if (type === 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object
      .keys(data)
      .forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    return axios.get(url, dataStr)
  } else {
    let param = new URLSearchParams();
    if (params) {
      param.append(params, JSON.stringify(data))
    } else {
      Object
        .keys(data)
        .forEach(key => {
          param.append(key, data[key])
        })
    }
    return axios.post(url, param)
  }
}

export default async(url = '', data = {}, method = 'get', params = "") => {
  try {
    const res = await server(method, url, data, params)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
