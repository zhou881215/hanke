/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createStore, createLogger } from "vuex";
import loginUser from "./loginUser";
import product from "./product";

export default createStore({
  modules: {
    loginUser,
    product,
  },
  plugins: [createLogger()],
});
