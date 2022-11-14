import http from "@/api";

// 查询商品列表
export const getGoods = () => {
  return http.get(`/store/3/goods/items`);
};
// 创建订单并生成支付链接
export const creatOrder = (params: object) => {
  return http.post(`/store/3/order`, params);
};
