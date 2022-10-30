import Header from "./components/Header"
import ShopCar from "./components/ShopCar"
import Commodity from "./components/Commodity"
import "./index.less"
import Context from "./context"
import { initData, reducer } from "./context"
import { useReducer } from "react"
import { IReducer, IContextProps } from "./interface"

function Shop() {
  const [state, dispatch] = useReducer<IReducer>(reducer, initData)
  const transferParmater: IContextProps = { state, dispatch }

  return (
    <Context.Provider value={transferParmater}>
      <div className="shop">
        <Header />
        <div className="content">
          <ShopCar />
          <Commodity />
        </div>
      </div>
    </Context.Provider>
  )
}

export default Shop
