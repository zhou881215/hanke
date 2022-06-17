/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */

export default [
  { path: "/login", component: () => import("../views/Login/index.vue") },
  {
    path: "/login/register",
    component: () => import("../views/Login/Register/index.vue"),
  },
  {
    path: "/login/reset",
    component: () => import("../views/Login/Reset/index.vue"),
  },
];
