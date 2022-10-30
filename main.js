const { app, BrowserWindow, ipc, Menu } = require("electron")
const path = require("path")
let mainWindow = null
//判断命令行脚本的第二参数
const mode = process.argv[2]

// 限制只启动一个
function makeSingleInstance() {
  if (process.mas) return
  app.requestSingleInstanceLock()
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}
// aa
// createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
function createWindow() {
  const windowOptions = {
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    // frame:false, // 有没有边框
  }
  mainWindow = new BrowserWindow(windowOptions)
  // 应用上面准备好的菜单配置生成
  const myMenuTemplate = [
    {
      // 设置菜单项文本
      label: "帮助",
      // 设置子菜单
      submenu: [
        {
          label: "关于",
        },
        {
          // 设置菜单的类型是分隔栏
          type: "separator",
        },
        {
          label: "关闭",
          // 设置菜单的热键
          accelerator: "Command+Q",
          click: () => {
            mainWindow.close()
          },
        },
      ],
    },
  ]
  const template = myMenuTemplate
  //  创建菜单对象
  const menu = Menu.buildFromTemplate(template)
  //  设置应用菜单
  Menu.setApplicationMenu(menu)
  //判断是否是开发模式
  if (mode === "dev") {
    mainWindow.loadURL("http://localhost:3301/") // http://localhost:8002/ 前端开发环境地址
    mainWindow.webContents.openDevTools() // 自动打开控制台
  } else {
    mainWindow.loadURL(path.join("file://", __dirname, "/dist/index.html"))
  }
  //接收渲染进程的信息
  ipc.on("min", function () {
    mainWindow.minimize()
  })
  ipc.on("max", function () {
    mainWindow.maximize()
  })
  ipc.on("login", function () {
    mainWindow.maximize()
  })

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

// 限制器
makeSingleInstance()

// app主进程的事件和方法
// 只有在ready事件被激发后才能创建浏览器窗口
app.whenReady().then(() => {
  createWindow()
  // 针对macos系统，在没有浏览器窗口打开的情况下调用你仅存的 createWindow() 方法
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// 关闭所有窗口通常会完全退出一个应用程序
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
module.exports = mainWindow
