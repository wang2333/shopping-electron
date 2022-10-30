import { useEffect, useState } from "react"
import loactionIcon from "@/assets/icon/loaction.svg"
import moment from "moment"

const now = moment().format("ll HH:mm:ss")
function Header() {
  const [time, setTime] = useState(now)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format("ll HH:mm:ss"))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="header">
      <div className="header-loac">
        <img src={loactionIcon} alt="" />
        大众网吧
      </div>
      <div className="header-title">在线超市</div>
      <div className="header-time">{time}</div>
    </div>
  )
}

export default Header
