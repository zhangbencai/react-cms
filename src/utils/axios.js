import axios from 'axios'
import { message } from 'antd'

let baseURL = 'http://localhost:9999/api/v1'  // 开发环境

// 创建axios实例
const fetch = axios.create({
  baseURL: baseURL,
  timeout: 7000,  // 超时设置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 封装请求拦截器
fetch.interceptors.request.use((config) => {
  // 在这里做一些检测或者包装等处理
  // console.log('请求拦截', config)
  // 鉴权 token添加
  config.headers.Authorization = localStorage.getItem('token') || ''
  return config
})

// 封装响应拦截器
fetch.interceptors.response.use((response) => {
  // 请求成功
  if (response.data && response.data.err===0) {
    return response.data.data
  } else {
    message.error(response.data.msg)
  }
}, (error) => {
  // 请求失败
  return Promise.reject(error)
})

export default fetch
