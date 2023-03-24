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
        // 相同的产品类别
        let sameBindname: string = "";
        const bindnameFlagArr: Array<{ index: number; bindname: string }> = [];

        // 相同的产品名称
        let sameCpmc: string = "";
        let cpmcFlagArr: number[] = [];

        // 相同的检测项目
        let sameJcxm: string = "";
        let jcxmFlagArr: number[] = [];

        // 循环匹配出相同类型的索引（行数）
        list.forEach(
          ({ bindname, lb, cpmc, jcxm }: IProductNew, index: number) => {
            const category = bindname ?? lb;
            if (sameBindname !== category) {
              sameBindname = category;
              bindnameFlagArr.push({ index, bindname: category });
            }
            if (sameCpmc !== cpmc) {
              sameCpmc = cpmc;
              cpmcFlagArr.push(index);
            }
            if (sameJcxm !== jcxm) {
              sameJcxm = jcxm;
              jcxmFlagArr.push(index);
            }
          }
        );

        // 加结尾，可以合并到底
        cpmcFlagArr.push(list.length);
        jcxmFlagArr.push(list.length);
        // 额外加一个最后，用于增加合并的产品名称和检查项目
        bindnameFlagArr.push({ index: list.length + 1, bindname: "" });

        // 反向循环增加大标题, 并增加相同名称、项目的行数
        for (let site = bindnameFlagArr.length - 1; site >= 0; site--) {
          const { index, bindname } = bindnameFlagArr[site];
          if (site !== bindnameFlagArr.length - 1) {
            list.splice(index, 0, { xh: bindname, customTitle: true } as any);
          }

          // 反向循环
          // 每有一个大标题，比大标题行数大（在此大标题以内的）的合并行数就要增加
          // 后面加过的就不用再看了
          for (let i = index - 1; i >= 0; i--) {
            if (cpmcFlagArr[i] >= bindnameFlagArr[site - 1]?.index) {
              cpmcFlagArr[i] = cpmcFlagArr[i] + site;
            }
          }
          for (let i = index - 1; i >= 0; i--) {
            if (jcxmFlagArr[i] >= bindnameFlagArr[site - 1]?.index) {
              jcxmFlagArr[i] = jcxmFlagArr[i] + site;
            }
          }
        }

        // 补位大标题
        for (let site = bindnameFlagArr.length - 2; site >= 0; site--) {
          const { index } = bindnameFlagArr[site];
          cpmcFlagArr.splice(index, 0, cpmcFlagArr[index] - 1);
          jcxmFlagArr.splice(index, 0, jcxmFlagArr[index] - 1);
        }

        commit("setProductNew", {
          list: list.map((pro: IProductNew) => ({
            ...pro,
            cpmcFlagArr,
            jcxmFlagArr,
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
