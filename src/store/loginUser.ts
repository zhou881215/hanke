/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { UserLocal, ILoginUser, IUserInfo } from "./constant";
// import * as userServ from "../api/user";

const state: ILoginUser = {
  userInfo: null as IUserInfo & null,
  userLoading: false,
};

export default {
  namespaced: true,
  state,
  mutations: {
    setUser(state: ILoginUser, payload: IUserInfo) {
      state.userInfo = payload;
    },
    setLoading(state: ILoginUser, payload: boolean) {
      state.userLoading = payload;
    },
  },
  actions: {
    /**
     * 登录
     */
    async loginIn({ commit }: any, { loginId, loginPwd }: any) {
      commit("setLoading", true);
      // const user = await userServ.login(loginId, loginPwd);
      const currentUser: IUserInfo = {
        userName: "Cram" + Math.random(),
        userRank: Math.random() > 0.8,
      };
      commit("setUser", currentUser);
      commit("setLoading", false);
      localStorage.setItem(UserLocal, JSON.stringify(currentUser));
      return currentUser;
    },
    /**
     * 登出
     */
    async loginOut({ commit }: any) {
      commit("setLoading", true);
      // await userServ.loginOut();
      commit("setUser", null);
      commit("setLoading", false);
      localStorage.removeItem(UserLocal);
    },
    /**
     * 是否已登录
     */
    loginOrNot({ commit }: any) {
      const localUserInfo: string | null = localStorage.getItem(UserLocal);
      try {
        const currentUser = JSON.parse(localUserInfo as string);
        commit("setUser", currentUser);
      } catch (error) {
        commit("setUser", null);
      }
    },
  },
};
