import { useContext, useState } from "react";
import shopIcon from "@/assets/icon/shop.svg";
import delIcon from "@/assets/icon/del.svg";
import minusIcon from "@/assets/icon/minus.svg";
import increaseIcon from "@/assets/icon/increase.svg";
import ShopImg from "@/assets/img/shop.png";
import Context from "../context";
import { Empty, message } from "antd";
import Pay from "./Pay";

function ShopCar() {
  const { state, dispatch } = useContext(Context);
  const { chooseCommodities } = state;
  const [visible, setVisible] = useState(false);

  const handleDelAll = () => {
    dispatch({ type: "delAll" });
  };
  const handlemMinus = (data) => {
    dispatch({ type: "delOne", data });
  };
  const handleIncrease = (data) => {
    if (!data.selectNum || data.stockQty > data.selectNum) {
      dispatch({ type: "addOne", data });
    } else {
      message.warning("库存不足，请选择其他商品！");
    }
  };
  const showOrder = () => {
    setVisible(true);
  };

  const queryTotal = () => {
    const total = chooseCommodities.reduce(
      (total, cur) => (total += cur.price * cur.selectNum),
      0
    );
    return (total / 100).toFixed(2);
  };
  return (
    <>
      <div className="shopcar" id="shopcar">
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
            chooseCommodities.map((item) => {
              return (
                <div className="shop-list-item" key={item.itemId}>
                  <div className="shop-list-item-name">{item.name}</div>
                  <div className="shop-list-item-price">
                    <span className="shop-list-item-price-unit">
                      ￥{((item.price * item.selectNum) / 100).toFixed(2)}
                    </span>
                    <span className="shop-list-item-price-num">
                      <a onClick={() => handlemMinus(item)}>
                        <img src={minusIcon} alt="" />
                      </a>
                      <span>{item.selectNum}</span>
                      <a onClick={() => handleIncrease(item)}>
                        <img src={increaseIcon} alt="" />
                      </a>
                    </span>
                  </div>
                </div>
              );
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
          <a className="shop-footer-submit" onClick={showOrder}>
            下单
          </a>
        </div>
      </div>
      <Pay visible={visible} setVisible={setVisible} />
    </>
  );
}

export default ShopCar;
