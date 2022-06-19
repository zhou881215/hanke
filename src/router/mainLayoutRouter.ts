/*
 * @Author: Cram
 * @Date: 2022-06-18 03:45:31
 */
import productRouter from "./productRouter";
import userRouter from "./userRouter";

const components = {
  MainLayout: () => import("../views/mainLayout/index.vue"),
};

export default [
  {
    name: "mainLayout",
    path: "/",
    component: components.MainLayout,
    redirect: "/product",
    children: [...productRouter, ...userRouter],
  },
];
