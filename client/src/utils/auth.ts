// import { useUserStore } from '@/store'
const isLogin = () => {
  return !!localStorage.getItem('token')
}

const getToken = () => {
  return localStorage.getItem('token')
}

// const setToken = (token: string) => {
//   useUserStore().token = token
//   localStorage.setItem('token', token)
// }

// const clearToken = () => {
//   useUserStore().resetInfo()
//   localStorage.removeItem('token')
// }

// export { isLogin, getToken, setToken, clearToken }

export { isLogin, getToken }
