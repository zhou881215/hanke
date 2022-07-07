/*
 * @Author: Cram
 * @Date: 2022-06-18 22:53:54
 */
import { ref } from "vue";
import { useStore } from "vuex";
import type { ISearchParam } from "../../api/productApi";
import { cloneDeep } from "../../utils";

export default function () {
  const store = useStore();

  const defaultSearch = {
    jcbz: "",
    jcxm: "",
    lb: "",
    cpmc: "",
    pageSize: 10,
    p: 1,
  };

  const searchParam = ref<ISearchParam>(cloneDeep(defaultSearch));

  const handleSearch = async (flag?: boolean) => {
    if (flag) {
      searchParam.value = cloneDeep(defaultSearch);
    }
    await store.dispatch("productStore/fetchProduct", searchParam.value);
  };

  return { searchParam, handleSearch };
}
