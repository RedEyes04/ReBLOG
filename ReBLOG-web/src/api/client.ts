import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 8000,
})

client.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    return Promise.reject(new Error('请求发生错误'))
  },
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  },
)

export default client
