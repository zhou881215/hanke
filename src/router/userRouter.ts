/*
 * @Author: Cram
 * @Date: 2022-06-17 17:33:06
 */
const components = {
  User: () => import("../views/User/index.vue"),
};

export default [
  {
    name: "user",
    path: "/user",
    component: components.User,
  },
];
