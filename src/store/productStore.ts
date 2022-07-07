/*
 * @Author: Cram
 * @Date: 2022-06-18 22:58:46
 */
import {
  fetchProductCategoryApi,
  fetchProductApi,
  fetchCurrentTotalApi,
  fetchDetailApi,
  saveSingleProductApi,
} from "../api/productApi";
import type {
  ISearchParam,
  ICategoryOptions,
  IProduct,
  IProductData,
  ICurrentToday,
} from "../api/productApi";
import { cloneDeep } from "../utils";

interface IProductStore {
  productLoading: boolean;
  categoryOptions: Array<ICategoryOptions>;
  productData: IProductData;
  currentToday: ICurrentToday;
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
  cma: "",
  cnas: "",
  jdxz: "",
  gys: "",
  sfzy: "",
  zyzq: "",
  ztfy: "",
};

const state: IProductStore = {
  productLoading: false,
  categoryOptions: [],
  productData: {
    list: [],
    count: "0",
  },
  currentToday: { todaycount: "0", totalcount: "0" },
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
    setCategory(state: IProductStore, payload: Array<ICategoryOptions>) {
      state.categoryOptions = payload;
    },
    setProduct(state: IProductStore, payload: IProductData) {
      state.productData = payload;
    },
    setCurrentToday(state: IProductStore, payload: ICurrentToday) {
      state.currentToday = payload;
    },
    setDetail(state: IProductStore, payload: IProduct) {
      state.productDetail = payload;
    },
    setSingleLoading(state: IProductStore, payload: boolean) {
      state.saveSingleLoading = payload;
    },
  },
  actions: {
    /**
     * 查询产品分类
     */
    async fetchProductCategory({ commit }: any) {
      const { flag, response } = (await fetchProductCategoryApi()) as any;
      flag && commit("setCategory", response);
    },
    /**
     * 查询产品列表
     */
    async fetchProduct({ commit }: any, payload: ISearchParam) {
      commit("setLoading", true);
      const { flag, response } = (await fetchProductApi(payload)) as any;
      flag && commit("setProduct", response);
      commit("setLoading", false);
    },
    /**
     * 查询当日总数
     */
    async fetchCurrentTotal({ commit }: any) {
      const { flag, response } = (await fetchCurrentTotalApi()) as any;
      flag && commit("setCurrentToday", response);
    },
    /**
     * 查询产品详情
     */
    async fetchDetail({ commit }: any, id: string) {
      const { flag, response } = (await fetchDetailApi(id)) as any;
      flag && commit("setDetail", response);
    },
    /**
     * 新增\更新单条产品
     */
    async saveSingleProduct({ commit }: any, payload: IProduct) {
      commit("setSingleLoading", true);
      const { flag } = (await saveSingleProductApi(payload)) as any;
      commit("setSingleLoading", false);
      return flag;
    },
  },
};
