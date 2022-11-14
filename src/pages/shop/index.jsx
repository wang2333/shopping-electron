import Header from "./components/Header";
import ShopCar from "./components/ShopCar";
import Commodity from "./components/Commodity";
import "./index.less";
import Context from "./context";
import { initData, reducer } from "./context";
import { useEffect, useReducer } from "react";
import { getGoods } from "@/api/modules/order";

function Shop() {
  const [state, dispatch] = useReducer(reducer, initData);
  const transferParmater = { state, dispatch };

  useEffect(() => {
    getGoods().then((res) => {
      console.log(res);
      let initData = {
        types: {
          0: "全部",
        },
        allGoods: [],
        commodities: [],
        chooseCommodities: [],
      };
      for (const item of res.goods) {
        initData.types[item.categoryNo] = item.categoryName;
        initData.allGoods.push(item);
        initData.commodities.push(item);
      }
      dispatch({
        type: "init",
        data: initData,
      });
    });
  }, []);

  return (
    <Context.Provider value={transferParmater}>
      <div className="shop" id="shop">
        <Header />
        <div className="content">
          <ShopCar />
          <Commodity />
        </div>
      </div>
    </Context.Provider>
  );
}

export default Shop;
