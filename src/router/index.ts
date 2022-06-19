/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createRouter, createWebHistory } from "vue-router";
import loginRouter from "./loginRouter";
import mainLayoutRouter from "./mainLayoutRouter";

const routes = [...mainLayoutRouter, ...loginRouter];

export default createRouter({
  history: createWebHistory(), // mode:"history"
  routes,
});
