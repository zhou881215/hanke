/*
 * @Author: Cram
 * @Date: 2022-06-17 17:33:06
 */
const components = {
  Composite: () => import("../views/Composite/index.vue"),
};

export default [
  {
    name: "composite",
    path: "/composite",
    component: components.Composite,
  },
];
