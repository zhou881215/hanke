/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:11
 */
import { delay } from "../api/loginApi";
import type { IUser, IUserDetail } from "../api/userApi";

interface IUserStore {
  userLoading: boolean;
  userData: Array<IUser>;
  userDetail: IUserDetail;
}

const state: IUserStore = {
  userLoading: false,
  userData: [],
  userDetail: {} as IUserDetail,
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
  },
  actions: {
    async fetchUser({ commit }: any, param: any) {
      commit("setLoading", true);
      await delay(1000);
      const { pageSize } = param;
      const result = Array(pageSize)
        .fill("")
        .map(() => ({
          id: Math.random().toString(32).substring(2),
          userName: Math.random().toString(32).substring(2),
          userPass: Math.random().toString(32).substring(2),
          phoneNumber: Math.random().toString(8).substring(2, 13),
          regdate: new Date(Math.random() * 10 ** 12).toLocaleDateString(),
          isAudit: Math.random() > 0.1,
        }));
      commit("setUser", result);
      commit("setLoading", false);
    },
    async deleteUser() {
      await delay(1000);
    },
    async fetchSingleUser({ commit }: any, param: any) {
      await delay(300);
      const userDetail: IUserDetail = {
        id: Math.random().toString(32).substring(2, 8),
        userName: Math.random().toString(32).substring(2),
        userPass: Math.random().toString(32).substring(2),
        phoneNumber: Math.random().toString(8).substring(2, 13),
        regdate: new Date(Math.random() * 10 ** 12).toLocaleDateString(),
        isAudit: Math.random() > 0.1,
        userTrack: Array(parseInt(Math.random() * 10 + ""))
          .fill("")
          .map(() => ({
            loginTime: new Date(Math.random() * 10 ** 12).toLocaleDateString(),
            visitLog: ["/product"],
            searchLog: Array(parseInt(Math.random() * 100 + ""))
              .fill("")
              .map(() => "产品" + Math.random().toString(32).substring(2)),
          })),
      };
      commit("setUserDetail", userDetail);
    },
    async updateSingleUser() {},
  },
};
