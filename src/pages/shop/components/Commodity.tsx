import { useContext, useState } from "react"
import noImgIcon from "@/assets/icon/noImg.svg"
import Context from "../context"
import { ICommodity } from "../interface"

function Commodity() {
  const { state, dispatch } = useContext(Context)
  const { types, commodities, chooseCommodities } = state
  const [activeType, setActiveType] = useState("0")

  const handleChangeType = (type: string) => {
    setActiveType(type)
    dispatch({ type: "changeCommodities", data: type })
  }
  const handleAdd = (data: ICommodity) => {
    dispatch({ type: "addOne", data })
  }

  return (
    <div className="commodity">
      <div className="commodity-type">
        {Object.keys(types).map((k) => (
          <a
            key={k}
            className={`${activeType === k ? "active" : ""}`}
            onClick={() => handleChangeType(k)}
          >
            {types[k]}
          </a>
        ))}
      </div>
      <div className="commodity-list">
        {commodities.map((item, index) => {
          const length = chooseCommodities.filter(
            (v) => v.id === item.id
          ).length
          return (
            <a
              key={item.name + index}
              className={`commodity-list-item ${!!length ? "active" : ""}`}
              onClick={() => handleAdd(item)}
            >
              {!!length && (
                <div className="commodity-list-item-num">{length}</div>
              )}
              {item.img ? (
                <img src={item.img} alt="" />
              ) : (
                <img src={noImgIcon} alt="" style={{ objectFit: "contain" }} />
              )}
              <div className="commodity-list-item-foot">
                <span>{item.name}</span>
                <span>￥{item.price.toFixed(2)}</span>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Commodity
