import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, removeToken } from "@/utils"

class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }
  // 页面刷新后，初始化时，调用getToken方法，从sessionStorage中取出token；
  // 如果取到了token，说明页面刷新了之后，接着使用页面刷新前的token，也就是token持久化(刷新token不丢失)。
  // 如果取不到token，说明页面处于首次渲染，sessionStorage中没有token，则取 || 后面的空串
  token = getToken() || ''
  async setToken(values) {
    const { tel: mobile, captcha: code } = values
    // 调用登录接口，存入token
    const res = await http.post('/authorizations', {
      mobile, code
    })
    this.token = res.data.token
    // 存入sessionStorage
    setToken(res.data.token)
  }

  loginOut() {
    this.token = ''
    removeToken()
  }
}

export { LoginStore }