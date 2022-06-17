/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { UserLocal } from "./constant";
import type { ILoginUser, IUserInfo } from "./constant";
import { delay } from "../api/login";

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
      await delay(1000);
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
      await delay(1000);
      commit("setUser", null);
      commit("setLoading", false);
      localStorage.removeItem(UserLocal);
    },
    /**
     * 注册
     */
    async userRegister({ commit }: any, payload: any) {
      commit("setLoading", true);
      await delay(1000);
      const mockResult: boolean = Math.random() > 0.5;
      commit("setLoading", false);
      return mockResult;
    },
    /**
     * 找回密码
     */
    async recoverPass({ commit }: any, payload: any) {
      commit("setLoading", true);
      await delay(1000);
      const mockResult: boolean = Math.random() > 0.5;
      commit("setLoading", false);
      return mockResult;
    },
  },
};
