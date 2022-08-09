import Layout from "@/pages/Layout";
import Login from "@/pages/Login"

// eslint-disable-next-line
export default [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />
  }
]