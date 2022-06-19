/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createStore, createLogger } from "vuex";
import loginStore from "./loginStore";
import productStore from "./productStore";
import userStore from "./userStore";

export default createStore({
  modules: {
    loginStore,
    productStore,
    userStore,
  },
  plugins: [createLogger()],
});
