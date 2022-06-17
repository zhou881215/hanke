/*
 * @Author: Cram
 * @Date: 2022-06-18 03:45:31
 */
import productRoutes from "./product";
import userRoutes from "./user";

const components = {
  MainLayout: () => import("../views/MainLayout/index.vue"),
};

export default [
  {
    name: "mainLayout",
    path: "/",
    component: components.MainLayout,
    redirect: "/product",
    children: [...productRoutes, ...userRoutes],
  },
];
