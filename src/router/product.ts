/*
 * @Author: Cram
 * @Date: 2022-06-17 17:40:01
 */
const components = {
  Product: () => import("../views/Product/index.vue"),
};

export default [
  {
    name: "product",
    path: "/",
    component: components.Product,
  },
];
