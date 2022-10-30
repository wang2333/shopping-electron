import { useContext } from "react"
import shopIcon from "@/assets/icon/shop.svg"
import delIcon from "@/assets/icon/del.svg"
import minusIcon from "@/assets/icon/minus.svg"
import increaseIcon from "@/assets/icon/increase.svg"
import ShopImg from "@/assets/img/shop.png"
import Context from "../context"
import { ICommodity } from "../interface"
import { Empty } from "antd"

function ShopCar() {
  const { state, dispatch } = useContext(Context)
  const { chooseCommodities } = state

  const handleDelAll = () => {
    dispatch({ type: "delAll" })
  }
  const handlemMinus = (data: ICommodity) => {
    dispatch({ type: "delOne", data })
  }
  const handleIncrease = (data: ICommodity) => {
    dispatch({ type: "addOne", data })
  }
  const handleSubmit = () => {}

  const formatList = (data: Array<ICommodity>): Array<ICommodity> => {
    const newList: Array<ICommodity> = []
    for (const item of data) {
      const index: number = newList.findIndex((v) => v.id === item.id)
      if (index === -1) {
        newList.push(item)
      }
    }
    return newList
  }
  const queryTotal = () => {
    const total = chooseCommodities.reduce(
      (total, cur) => (total += cur.price),
      0
    )
    return total.toFixed(2)
  }
  return (
    <div className="shopcar">
      <div className="shop-header">
        <span>
          <img src={shopIcon} alt="" />
          已选商品
        </span>
        <a onClick={handleDelAll}>
          <img src={delIcon} alt="" />
          清空
        </a>
      </div>
      <div className="shop-list">
        {chooseCommodities.length > 0 ? (
          formatList(chooseCommodities).map((item) => {
            const length = chooseCommodities.filter(
              (v) => v.id === item.id
            ).length
            return (
              <div className="shop-list-item" key={item.id}>
                <div className="shop-list-item-name">{item.name}</div>
                <div className="shop-list-item-price">
                  <span className="shop-list-item-price-unit">
                    ￥{item.price.toFixed(2)}
                  </span>
                  <span className="shop-list-item-price-num">
                    <a onClick={() => handlemMinus(item)}>
                      <img src={minusIcon} alt="" />
                    </a>
                    <span>{length}</span>
                    <a onClick={() => handleIncrease(item)}>
                      <img src={increaseIcon} alt="" />
                    </a>
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <Empty image={ShopImg} description={false} />
        )}
      </div>
      <div className="shop-footer">
        <div className="shop-footer-num">
          <span>合计：</span>
          <span className="shop-footer-num-tag">￥</span>
          <span className="shop-footer-num-total">{queryTotal()}</span>
        </div>
        <a className="shop-footer-submit" onClick={handleSubmit}>
          结算
        </a>
      </div>
    </div>
  )
}

export default ShopCar
