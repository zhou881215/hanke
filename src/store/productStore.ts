/*
 * @Author: Cram
 * @Date: 2022-06-18 22:58:46
 */
import { delay } from "../api/loginApi";
import type { IProduct, ISearchParam } from "../api/productApi";

interface IProductStore {
  productLoading: boolean;
  productData: Array<IProduct>;
}

const state: IProductStore = {
  productLoading: false,
  productData: [],
};

export default {
  namespaced: true,
  state,
  mutations: {
    setProduct(state: IProductStore, payload: Array<IProduct>) {
      state.productData = payload;
    },
    setLoading(state: IProductStore, payload: boolean) {
      state.productLoading = payload;
    },
  },
  actions: {
    async fetchProduct({ commit }: any, param: ISearchParam) {
      commit("setLoading", true);
      await delay(1000);
      const { pageSize } = param;
      const result = Array(pageSize)
        .fill("")
        .map(() => ({
          lb: Math.random().toString(32).substring(2, 8),
        }));
      commit("setProduct", result);
      commit("setLoading", false);
    },
  },
};
