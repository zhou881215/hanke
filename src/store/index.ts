/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { createStore, createLogger } from "vuex";
import loginUser from "./loginUser";

export default createStore({
  modules: {
    loginUser,
  },
  plugins: [createLogger()],
});
