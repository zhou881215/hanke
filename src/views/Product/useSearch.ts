/*
 * @Author: Cram
 * @Date: 2022-06-18 22:53:54
 */
import { ref } from "vue";
import { useStore } from "vuex";
import type { ISearchParam } from "../../api/productApi";
import type { IUserInfo } from "../../api/loginApi";
import { cloneDeep } from "../../utils";

export default function (userInfo: IUserInfo) {
  const store = useStore();

  const defaultSearch = {
    jcbz: "",
    jcxm: "",
    lb: "",
    cpmc: "",
    pageSize: 20,
    p: 1,
  };

  const searchParam = ref<ISearchParam>(cloneDeep(defaultSearch));

  const handleSearch = async (flag?: boolean) => {
    if (flag) {
      searchParam.value = cloneDeep(defaultSearch);
    }
    await store.dispatch("productStore/fetchProduct", {
      ...searchParam.value,
      ssid: userInfo.ssid,
    });
  };

  return { searchParam, handleSearch };
}
