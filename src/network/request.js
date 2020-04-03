import axios from 'axios'

export function request(config) {

  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h3',
    timeout: 5000
  })
  // 2. axios的拦截器
  // 拦截请求
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  // 拦截响应
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}