import { useNavigate } from "react-router-dom"
function index() {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate("/home")
  }
  return <a onClick={handleGoHome}>点击登录</a>
}

export default index
