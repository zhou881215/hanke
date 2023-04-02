// import { fetchProductNewApi } from "../api/productNewApi";
import { fetchProductApi } from "../api/productApi";
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
      const { flag, response } = (await fetchProductApi(payload)) as any;
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

        // 用类别来分割成堆
        let cpmcHeap = [];
        let jcxmHeap = [];
        // 反向循环增加大标题, 并增加相同名称、项目的行数
        for (let site = bindnameFlagArr.length - 1; site >= 0; site--) {
          const { index, bindname } = bindnameFlagArr[site];
          // 插入大标题
          list.splice(index, 0, { xh: bindname, customTitle: true } as any);
          // 以类别把产品名称分为若干堆，后续增加对应的行数
          const cpmcIndex = cpmcFlagArr.findIndex((cpmc) => index === cpmc);
          cpmcHeap.unshift(cpmcFlagArr.splice(cpmcIndex));
          const jcxmIndex = jcxmFlagArr.findIndex((jcxm) => index === jcxm);
          jcxmHeap.unshift(jcxmFlagArr.splice(jcxmIndex));
        }
        // 二位堆增大对应的行数并拉平成一维数组赋回去
        cpmcFlagArr = cpmcHeap
          .map((heap, index) => heap.map((h) => h + index + 1))
          .flat();
        jcxmFlagArr = jcxmHeap
          .map((heap, index) => heap.map((h) => h + index + 1))
          .flat();

        // 补位大标题的空缺合并
        // 大标题只有一行，就让它上面的缩1
        for (let site = 1; site < bindnameFlagArr.length; site++) {
          const { index } = bindnameFlagArr[site];
          const mend = index + site;
          for (let j = 0; j < cpmcFlagArr.length; j++) {
            if (cpmcFlagArr[j] > mend) {
              cpmcFlagArr.splice(j, 0, mend);
              break;
            }
          }
          for (let j = 0; j < jcxmFlagArr.length; j++) {
            if (jcxmFlagArr[j] > mend) {
              jcxmFlagArr.splice(j, 0, mend);
              break;
            }
          }
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
