// 封装localstorage存取token

const key = 'pc-key'

// 存token至localstorage
const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}

// 从localstorage中取token
const getToken = () => {
  return window.localStorage.getItem(key)
}

//从localstorage中删除token
const removeToken = () => {
  return window.localStorage.removeItem(key)
}

export { setToken, getToken, removeToken }