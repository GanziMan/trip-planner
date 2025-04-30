import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response?.status
    const reqUrl = error.config?.url
    // Skip redirect for registration endpoint
    if (status === 401 && reqUrl !== '/user/register') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
export default axiosInstance
