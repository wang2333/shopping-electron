/* eslint-disable */
import { Navigate, useRoutes } from "react-router-dom"
import Login from "@/pages/login"

interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  isLink?: string
}

// * 导入所有router
// @ts-ignore
const metaRouters: any = import.meta.globEager("./modules/*.tsx")

// * 处理路由
export const routerArray: RouteObject[] = []

Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key])
  })
})

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  ...routerArray,
  {
    path: "*",
    // element: <Navigate to="/404" />,
    element: <Navigate to="/login" />,
  },
]

const Router = () => {
  // @ts-ignore
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router
