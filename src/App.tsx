import { ConfigProvider } from "antd"
import { HashRouter, BrowserRouter } from "react-router-dom"
import AuthRouter from "@/routers/authRouter"
import Router from "@/routers/index"
import zhCN from "antd/lib/locale/zh_CN"
import "moment/dist/locale/zh-cn"

const App = () => {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </HashRouter>
  )
}

export default App
