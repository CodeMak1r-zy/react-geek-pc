import { Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
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
    </AuthRoute>,
    children: [
      {
        path: "home",
        element: <AuthRoute>
          <Home />
        </AuthRoute>
      },
      {
        path: "article",
        element: <AuthRoute>
          <Article />
        </AuthRoute>
      },
      {
        path: "publish",
        element: <AuthRoute>
          <Publish />
        </AuthRoute>
      },
      {
        path: "",
        element: <Navigate to="home" replace />
      }
    ]
  }
]