import { createContext } from "react";

export const initData = {
  types: {},
  allGoods: [],
  commodities: [],
  chooseCommodities: [],
};

export const reducer = (state, action) => {
  let newState = { ...state };
  const { type, data } = action;
  switch (type) {
    case "init":
      newState = data;
      break;
    // 切换商品类型
    case "changeCommodities":
      if (data != 0) {
        newState.commodities = newState.allGoods.filter(
          (v) => v.categoryNo === data
        );
      } else {
        newState.commodities = newState.allGoods;
      }
      break;
    // 清空购物车
    case "delAll":
      newState.chooseCommodities = [];
      break;
    // 减少单个
    case "delOne":
      const index = newState.chooseCommodities.findIndex(
        (v) => v.itemId === data.itemId
      );
      const item = newState.chooseCommodities[index];
      item.selectNum -= 1;

      // 数量为0时 删除商品
      if (item.selectNum === 0) {
        newState.chooseCommodities.splice(index, 1);
      }
      break;
    // 增加单个
    case "addOne":
      const addObj = newState.chooseCommodities.find(
        (v) => v.itemId === data.itemId
      );
      if (addObj) {
        addObj.selectNum += 1;
      } else {
        data.selectNum = 1;
        newState.chooseCommodities.push(data);
      }

      break;
    default:
      break;
  }
  return newState;
};

export default createContext({});
