import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'

// import { useUserStore } from '@/store'

export interface HttpResponse<T = unknown> {
  msg: string
  code: number
  data: T
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if (config.hasOwnProperty('data')) {
    //   console.log(JSON.parse(JSON.stringify(config.data)))
    // }
    //请求拦截，在请求发送前需对请求按需判断
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    console.log(res)
    //响应码不为200即为失败
    if (res.code !== 200) {
      //此处添加错误提示代码
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    //响应码为xxx代表token有问题，具体由后端制定
    // if ([401].includes(res.code) && response.config.url !== 'api/user/info') {
    //   //此处添加错误提示代码和处理代码
    // }
    return res
  },
  (error) => {
    //添加错误提示代码
    Message.error({
      content: error.msg,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
