import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";

// eslint-disable-next-line
export default [
  // 不需要鉴权的组件Login
  {
    path: "/login",
    element: <Login />
  },
  // 需要鉴权的组件Layout
  {
    path: "/",
    element: <AuthRoute>
      <Layout />
    </AuthRoute>
  }
]