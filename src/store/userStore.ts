/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:11
 */
import {
  fetchUserApi,
  deleteUserApi,
  fetchSingleUserApi,
  updateSingleUserApi,
  downloadLogApi,
} from "../api/userApi";
import type {
  IFetchUser,
  IUserSsid,
  IUpdateUser,
  IUserData,
  IUserDetail,
  IUserDetailInfo,
} from "../api/userApi";

interface IUserStore {
  userLoading: boolean;
  userData: IUserData;
  userDetail: IUserDetail;
  userDetailLoading: boolean;
}

const state: IUserStore = {
  userLoading: false,
  userData: {
    list: [],
    count: "0",
  },
  userDetail: {
    userinfo: {} as IUserDetailInfo,
    logdata: [],
  } as IUserDetail,
  userDetailLoading: false,
};

export default {
  namespaced: true,
  state,
  mutations: {
    setLoading(state: IUserStore, payload: boolean) {
      state.userLoading = payload;
    },
    setUser(state: IUserStore, payload: IUserData) {
      state.userData = payload;
    },
    setUserDetail(state: IUserStore, payload: IUserDetail) {
      state.userDetail = payload;
    },
    setUserDetailLoading(state: IUserStore, payload: boolean) {
      state.userDetailLoading = payload;
    },
  },
  actions: {
    /**
     * 查询用户列表
     */
    async fetchUser({ commit }: any, payload: IFetchUser) {
      commit("setLoading", true);
      const { flag, response } = (await fetchUserApi(payload)) as any;
      flag && commit("setUser", response);
      commit("setLoading", false);
    },
    /**
     * 删除用户
     */
    async deleteUser({ commit }: any, payload: IUserSsid) {
      const { flag } = (await deleteUserApi(payload)) as any;
      return flag;
    },
    /**
     * 查询用户详情
     */
    async fetchSingleUser({ commit }: any, payload: IUserSsid) {
      commit("setUserDetailLoading", true);
      const { flag, response } = (await fetchSingleUserApi(payload)) as any;
      if (flag) {
        const { userinfo, logdata } = response;
        const result: IUserDetail = {
          userinfo: { ...userinfo, status: userinfo.status === "1" },
          logdata,
        };
        commit("setUserDetail", result);
      }
      commit("setUserDetailLoading", false);
    },
    /**
     * 更新用户
     */
    async updateSingleUser({ commit }: any, payload: IUpdateUser) {
      commit("setUserDetailLoading", true);
      const { flag } = (await updateSingleUserApi(payload)) as any;
      commit("setUserDetailLoading", false);
      return flag;
    },
    /**
     * 下载日志
     */
    async downloadLog({ commit }: any, payload: IUserSsid) {
      const { flag, response } = (await downloadLogApi(payload)) as any;
      if (flag) {
        const a = document.createElement("a");
        a.setAttribute("href", response);
        a.click();
      }
    },
  },
};
