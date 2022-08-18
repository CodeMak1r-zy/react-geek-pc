import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import Loading from "@/components/Loading";
const Layout = lazy(() => import('@/pages/Layout'))
// import Layout from "@/pages/Layout";
const Login = lazy(() => import('@/pages/Login'))
// import Login from "@/pages/Login";
const Home = lazy(() => import('@/pages/Home'))
// import Home from "@/pages/Home";
const Article = lazy(() => import('@/pages/Article'))
// import Article from "@/pages/Article";
const Publish = lazy(() => import('@/pages/Publish'))
// import Publish from "@/pages/Publish";

// eslint-disable-next-line
export default [
  // 不需要鉴权的组件Login
  {
    path: "/login",
    element: <Suspense fallback={<Loading />}><Login /></Suspense>
  },
  // 需要鉴权的组件Layout
  {
    path: "/",
    element: <AuthRoute>
      <Suspense fallback={<Loading />}><Layout /></Suspense>
    </AuthRoute>,
    children: [
      {
        path: "home",
        element: <AuthRoute>
          <Suspense fallback={<Loading />}><Home /></Suspense>
        </AuthRoute>
      },
      {
        path: "article",
        element: <AuthRoute>
          <Suspense fallback={<Loading />}><Article /></Suspense>
        </AuthRoute>
      },
      {
        path: "publish",
        element: <AuthRoute>
          <Suspense fallback={<Loading />}><Publish /></Suspense>
        </AuthRoute>
      },
      {
        path: "",
        element: <Navigate to="home" replace />
      }
    ]
  }
]