/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createRouter, createWebHistory } from "vue-router";
import loginRoutes from "./login";
import mainLayoutRoutes from "./mainLayout";

const routes = [...mainLayoutRoutes, ...loginRoutes];

export default createRouter({
  history: createWebHistory(), // mode:"history"
  routes,
});
