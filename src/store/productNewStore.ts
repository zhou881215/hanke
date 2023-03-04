import { fetchProductNewApi } from "../api/productNewApi";
import type {
  ISearchParamNew,
  IProductNew,
  IProductNewData,
} from "../api/productNewApi";

interface IProductNewStore {
  productNewLoading: boolean;
  productNewData: IProductNewData;
}

const state: IProductNewStore = {
  productNewLoading: false,
  productNewData: {
    list: [],
    count: "0",
  },
};

export default {
  namespaced: true,
  state,
  mutations: {
    setLoading(state: IProductNewStore, payload: boolean) {
      state.productNewLoading = payload;
    },
    setProductNew(state: IProductNewStore, payload: IProductNewData) {
      state.productNewData = payload;
    },
  },
  actions: {
    /**
     * 查询产品列表
     */
    async fetchProductNew({ commit }: any, payload: ISearchParamNew) {
      commit("setLoading", true);
      const { flag, response } = (await fetchProductNewApi(payload)) as any;
      if (flag) {
        const { list, count } = response as IProductNewData;
        // 相同的产品名称
        let sameBindname: string = "";
        const bindnameFlagArr: Array<{ index: number; bindname: string }> = [];
        // 相同的产品名称
        let sameTitle: string = "";
        let titleFlagArr: number[] = [];

        // 相同的检测项目
        let sameXm: string = "";
        let xmFlagArr: number[] = [];

        // 循环匹配出相同类型的索引（行数）
        list.forEach(({ bindname, title, xm }: IProductNew, index: number) => {
          if (sameBindname !== bindname) {
            sameBindname = bindname;
            bindnameFlagArr.push({ index, bindname });
          }
          if (sameTitle !== title) {
            sameTitle = title;
            titleFlagArr.push(index);
          }
          if (sameXm !== xm) {
            sameXm = xm;
            xmFlagArr.push(index);
          }
        });

        // 加结尾
        titleFlagArr.push(list.length);
        xmFlagArr.push(list.length);

        // 反向循环增加大标题, 并增加相同名称、项目的行数
        for (let site = bindnameFlagArr.length - 1; site >= 0; site--) {
          const { index, bindname } = bindnameFlagArr[site];
          list.splice(index, 0, { xh: bindname, customTitle: true } as any);
          // 每有一个大标题，比大标题行数大（在此大标题以内的）的合并行数就要加site+1
          titleFlagArr = titleFlagArr.map((title) =>
            title >= index ? title + site + 1 : title
          );
          xmFlagArr = xmFlagArr.map((title) =>
            title >= index ? title + site + 1 : title
          );
        }

        commit("setProductNew", {
          list: list.map((pro: IProductNew) => ({
            ...pro,
            titleFlagArr,
            xmFlagArr,
          })),
          count,
        });
      } else {
        commit("setProductNew", { list: [], count: "0" });
      }
      commit("setLoading", false);
    },
  },
};
