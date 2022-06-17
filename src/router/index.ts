/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createRouter, createWebHistory } from "vue-router";
import productRoutes from "./product";
import loginRoutes from "./login";
import userRoutes from "./user";

const routes = [...productRoutes, ...loginRoutes, ...userRoutes];

export default createRouter({
  history: createWebHistory(), // mode:"history"
  routes,
});
