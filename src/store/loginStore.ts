/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import {
  loginInApi,
  loginOutApi,
  getAuthCodeApi,
  userRegisterApi,
  recoverPassApi,
} from "../api/loginApi";
import type {
  ILoginData,
  IUserInfo,
  ISsid,
  IRegisterInfo,
  IRecoverInfo,
} from "../api/loginApi";

export const UserLocal: string = "userLocal";

export interface ILoginUser {
  userInfo: IUserInfo;
  userLoading: boolean;
}

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
    async loginIn({ commit }: any, payload: ILoginData) {
      commit("setLoading", true);
      const { flag, response } = (await loginInApi(payload)) as any;
      if (flag) {
        commit("setUser", response);
        localStorage.setItem(UserLocal, JSON.stringify(response));
      }
      commit("setLoading", false);
      return flag;
    },
    /**
     * 注销
     */
    async loginOut({ commit }: any, payload: ISsid) {
      commit("setLoading", true);
      const { flag } = (await loginOutApi(payload)) as any;
      if (flag) {
        commit("setUser", null);
        localStorage.removeItem(UserLocal);
      }
      commit("setLoading", false);
      return flag;
    },
    /**
     * 获取验证码
     */
    async getAuthCode({ commit }: any, payload: string) {
      commit("setLoading", true);
      const { flag, response } = (await getAuthCodeApi(payload)) as any;
      const remainTime = flag ? 60 : parseInt(response.substring(2));
      commit("setLoading", false);
      return remainTime;
    },
    /**
     * 注册
     */
    async userRegister({ commit }: any, payload: IRegisterInfo) {
      commit("setLoading", true);
      const { flag } = (await userRegisterApi(payload)) as any;
      commit("setLoading", false);
      return flag;
    },
    /**
     * 找回密码
     */
    async recoverPass({ commit }: any, payload: IRecoverInfo) {
      commit("setLoading", true);
      const { flag } = (await recoverPassApi(payload)) as any;
      commit("setLoading", false);
      return flag;
    },
  },
};
