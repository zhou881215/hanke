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
import type { IFetchUser, IUser, IUserDetail } from "../api/userApi";

interface IUserStore {
  userLoading: boolean;
  userData: Array<IUser>;
  userDetail: IUserDetail;
  userDetailLoading: boolean;
}

const state: IUserStore = {
  userLoading: false,
  userData: [],
  userDetail: {} as IUserDetail,
  userDetailLoading: false,
};

export default {
  namespaced: true,
  state,
  mutations: {
    setLoading(state: IUserStore, payload: boolean) {
      state.userLoading = payload;
    },
    setUser(state: IUserStore, payload: Array<IUser>) {
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
    async deleteUser({ commit }: any, payload: string) {
      const { flag } = (await deleteUserApi(payload)) as any;
      return flag;
    },
    /**
     * 查询用户详情
     */
    async fetchSingleUser({ commit }: any, payload: string) {
      commit("setUserDetailLoading", true);
      const { flag, response } = (await fetchSingleUserApi(payload)) as any;
      flag && commit("setUserDetail", response);
      commit("setUserDetailLoading", false);
    },
    /**
     * 更新用户
     */
    async updateSingleUser({ commit }: any, payload: IUserDetail) {
      commit("setUserDetailLoading", true);
      const { flag } = (await updateSingleUserApi(payload)) as any;
      commit("setUserDetailLoading", false);
      return flag;
    },
    /**
     * 下载日志
     */
    async downloadLog({ commit }: any, payload: string) {
      await downloadLogApi(payload);
    },
  },
};
