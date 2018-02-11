import axios from 'axios'
import { baseURL } from './config'
import { responseInterceptor, handleResponseError } from './interceptor'
// import domains from './domains'

// axios拦截器
// axios.interceptors.request.use(responseInterceptor, handleResponseError)

async function server(type, url, data) {
  type = type.toUpperCase()
  url = baseURL + url
  if (type === 'GET') {
    return axios.get(url, data)
  } else {
    return axios.post(url, data)
  }
}

export default async (url = '', data = {}, method = 'get') => {
  try {
    const res = await server(method, url, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
