import { useContext, createContext } from "react";
import { LoginStore } from "./login.Store";
import { UserStore } from "./user.Store";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}
const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)
export { useStore }