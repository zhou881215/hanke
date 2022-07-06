/*
 * @Author: Cram
 * @Date: 2022-06-18 22:58:46
 */
import { delay } from "../api/loginApi";
import { fetchProductApi } from "../api/productApi";
import type { IProduct, ISearchParam } from "../api/productApi";
import { cloneDeep } from "../utils";

interface IProductStore {
  productLoading: boolean;
  productData: Array<IProduct>;
  productDetail: IProduct;
  saveSingleLoading: boolean;
}
export const defaultDetail: IProduct = {
  id: "",
  xh: "",
  lb: "",
  cpmc: "",
  jcxm: "",
  xmbm: "",
  jcbz: "",
  bzmc: "",
  jcx: "",
  pdbz: "",
  ypxq: "",
  zxypl: "",
  csyq: "",
  zqlx: "",
  jczq: "",
  bz: "",
  cb: "",
  cma: "无",
  cnas: "有",
  jdxz: "",
  gys: "",
  sfzy: "",
  zyzq: "",
  ztfy: "",
};
const state: IProductStore = {
  productLoading: false,
  productData: [],
  productDetail: cloneDeep(defaultDetail),
  saveSingleLoading: false,
};

export default {
  namespaced: true,
  state,
  mutations: {
    setLoading(state: IProductStore, payload: boolean) {
      state.productLoading = payload;
    },
    setProduct(state: IProductStore, payload: Array<IProduct>) {
      state.productData = payload;
    },
    setDetail(state: IProductStore, payload: IProduct) {
      state.productDetail = payload;
    },
    setSingleLoading(state: IProductStore, payload: boolean) {
      state.saveSingleLoading = payload;
    },
  },
  actions: {
    async fetchProduct({ commit }: any, payload: ISearchParam) {
      commit("setLoading", true);

      const { flag, response } = (await fetchProductApi(payload)) as any;
      if (flag) {
        commit("setProduct", response);
      }
      commit("setLoading", false);
    },
    async fetchDetail({ commit }: any, payload: string) {
      await delay(300);
      const result: IProduct = {
        lb: Math.random().toString(32).substring(2, 8),
      } as IProduct;
      commit("setDetail", result);
    },
    async saveSingleProduct({ commit, state }: any) {
      commit("setSingleLoading", true);
      await delay(1000);
      // 根据state判断新增还是更新
      if (state.productDetail.id) {
      }
      commit("setSingleLoading", false);
    },
  },
};
