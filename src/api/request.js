//request .js 文件
// 引入axios请求库
import axios from 'axios'
export const BASE_URL = 'http://localhost:21006'

const service = axios.create({
  // baseURL: BASE_URL,
  timeout: 15000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
