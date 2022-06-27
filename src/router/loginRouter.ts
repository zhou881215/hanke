/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
const components = {
  Login: () => import("../views/Login/index.vue"),
  Register: () => import("../views/Register/index.vue"),
  Recover: () => import("../views/Recover/index.vue"),
};

export default [
  {
    name: "login",
    path: "/login",
    component: components.Login,
  },
  {
    name: "register",
    path: "/register",
    component: components.Register,
  },
  {
    name: "recover",
    path: "/recover",
    component: components.Recover,
  },
];
