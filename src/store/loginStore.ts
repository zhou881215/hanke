/*
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
 */
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import {
  loginInApi,
  loginOutApi,
  getAuthCodeApi,
  userRegisterApi,
  recoverPassApi,
} from "../api/loginApi";
import type { ILoginData, IRegisterInfo, IRecoverInfo } from "../api/loginApi";

const router = useRouter();

export const UserLocal: string = "userLocal";

export interface ILoginUser {
  userInfo: IUserInfo;
  userLoading: boolean;
}

export interface IUserInfo {
  userName: string;
  userRank: boolean;
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
    async loginIn({ commit }: any, params: ILoginData) {
      commit("setLoading", true);
      const { flag, response } = (await loginInApi(params)) as any;
      if (flag) {
        commit("setUser", response);
        localStorage.setItem(UserLocal, JSON.stringify(response));
        router.push({ name: "mainLayout" });
      }
      commit("setLoading", false);
    },
    /**
     * 注销
     */
    async loginOut({ commit }: any) {
      commit("setLoading", true);
      const { flag } = (await loginOutApi()) as any;
      if (flag) {
        commit("setUser", null);
        localStorage.removeItem(UserLocal);
        router.push({ name: "login" });
      }
      commit("setLoading", false);
    },
    /**
     * 获取验证码
     */
    async getAuthCode({ commit }: any, phone: string) {
      commit("setLoading", true);
      const { flag, response } = (await getAuthCodeApi(phone)) as any;
      let count = 60;
      if (!flag) {
        count = parseInt(response.substring(2));
      }
      commit("setLoading", false);
      return count;
    },
    /**
     * 注册
     */
    async userRegister({ commit }: any, payload: IRegisterInfo) {
      commit("setLoading", true);
      const { flag } = (await userRegisterApi(payload)) as any;
      if (flag) {
        ElNotification.success({
          title: "注册成功",
          message: "请等待管理员审核后，再进行登录查询",
        });
      }
      commit("setLoading", false);
    },
    /**
     * 找回密码
     */
    async recoverPass({ commit }: any, payload: IRecoverInfo) {
      commit("setLoading", true);
      const { flag } = (await recoverPassApi(payload)) as any;
      if (flag) {
        ElNotification.success({
          title: "修改成功",
          message: "请牢记新密码",
        });
        router.push({ name: "login" });
      }
      commit("setLoading", false);
    },
  },
};
