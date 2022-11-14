import { useContext, useState } from "react";
import noImgIcon from "@/assets/icon/noImg.svg";
import Context from "../context";
import { message } from "antd";

function Commodity() {
  const { state, dispatch } = useContext(Context);
  const { types, commodities, chooseCommodities } = state;
  const [activeType, setActiveType] = useState("0");

  const handleChangeType = (type) => {
    setActiveType(type);
    dispatch({ type: "changeCommodities", data: type });
  };
  const handleAdd = (data) => {
    if (!data.selectNum || data.stockQty > data.selectNum) {
      dispatch({ type: "addOne", data });
    } else {
      message.warning("库存不足，请选择其他商品！");
    }
  };

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
          const selectNum =
            chooseCommodities.find((v) => v.itemId === item.itemId)
              ?.selectNum || 0;
          return (
            <a
              key={item.name + index}
              className={`commodity-list-item ${!!selectNum ? "active" : ""}`}
              onClick={() => handleAdd(item)}
            >
              {!!selectNum && (
                <div className="commodity-list-item-num">{selectNum}</div>
              )}
              {item.img ? (
                <img src={item.img} alt="" />
              ) : (
                <img src={noImgIcon} alt="" style={{ objectFit: "contain" }} />
              )}
              <div className="commodity-list-item-foot">
                <span>{item.name}</span>
                <span>￥{(item.price / 100).toFixed(2)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Commodity;
