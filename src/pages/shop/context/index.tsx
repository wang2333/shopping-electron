import { createContext } from "react"
import { IInitData, IAction, IContextProps } from "../interface"

const listData = [
  {
    id: "1",
    type: "1",
    name: "蛋黄酥",
    price: 25.9,
    img: "https://gdp.alicdn.com/imgextra/i2/619123122/O1CN01grANmG1YvvBcAAeB8_!!619123122.jpg",
  },
  {
    id: "2",
    type: "1",
    name: "猪肉脯",
    price: 23.9,
    img: "https://gdp.alicdn.com/imgextra/i1/619123122/O1CN017ehs5i1Yvv9KPx1QC_!!619123122.jpg",
  },
  {
    id: "3",
    type: "1",
    name: "芒果干",
    price: 26.9,
    img: "https://gdp.alicdn.com/imgextra/i1/619123122/O1CN01W23t7e1Yvv8DrU6jx_!!619123122.jpg",
  },
  {
    id: "4",
    type: "2",
    name: "汇源果汁",
    price: 4.9,
    img: "https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/1584260750/O1CN01YAI9yb1HPXphEjutd_!!0-item_pic.jpg_580x580Q90.jpg",
  },
  {
    id: "5",
    type: "3",
    name: "芙蓉王",
    price: 14.9,
    img: "https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2214060141547/O1CN01ttYt6V1NIZVE4HzPp_!!0-item_pic.jpg_580x580Q90.jpg_.webp",
  },
  {
    id: "6",
    type: "4",
    name: "红油面皮",
    price: 13.9,
    img: "https://gdp.alicdn.com/imgextra/i2/619123122/O1CN01jWkezz1YvvBePoufU_!!619123122.png",
  },
  {
    id: "7",
    type: "4",
    name: "肉包子",
    price: 3.9,
  },
]
export const initData: IInitData = {
  types: {
    0: "全部",
    1: "零食",
    2: "饮料",
    3: "香烟",
    4: "快餐",
  },
  commodities: listData,
  chooseCommodities: [],
}

export const reducer = (state: IInitData, action: IAction): IInitData => {
  const newState = { ...state }
  const { type, data } = action
  switch (type) {
    // 切换商品类型
    case "changeCommodities":
      if (data != 0) {
        newState.commodities = listData.filter((v) => v.type === data)
      } else {
        newState.commodities = listData
      }
      break
    // 清空购物车
    case "delAll":
      newState.chooseCommodities = []
      break
    // 减少单个
    case "delOne":
      const index = newState.chooseCommodities.findIndex(
        (v) => v.id === data.id
      )
      newState.chooseCommodities.splice(index, 1)
      break
    // 增加单个
    case "addOne":
      newState.chooseCommodities.push(data)
      break
    default:
      break
  }
  return newState
}

export default createContext({} as IContextProps)
