// 封装sessionstorage存取token

const key = 'pc-key'

// 存token至sessionstorage
const setToken = (token) => {
  return window.sessionStorage.setItem(key, token)
}

// 从sessionstorage中取token
const getToken = () => {
  return window.sessionStorage.getItem(key)
}

//从sessionstorage中删除token
const removeToken = () => {
  return window.sessionStorage.removeItem(key)
}

export { setToken, getToken, removeToken }