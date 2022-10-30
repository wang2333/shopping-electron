import Home from "@/pages/shop"

export interface RouteObject {
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
}

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    path: "/home",
    element: <Home />,
  },
]

export default homeRouter
