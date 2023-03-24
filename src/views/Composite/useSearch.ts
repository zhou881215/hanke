/*
 * @Author: Cram
 * @Date: 2022-06-18 22:53:54
 */
import { ref } from "vue";
import { useStore } from "vuex";
import type { ISearchParamNew } from "../../api/productNewApi";
import type { IUserInfo } from "../../api/loginApi";
import { cloneDeep } from "../../utils";

export default function (userInfo: IUserInfo) {
  const store = useStore();

  const defaultSearch: ISearchParamNew = {
    lb: "",
    cpmc: "",
    jcxm: "",
    jcbz: "",
    city: "",
    pageSize: 20,
    p: 1,
  };

  const searchParam = ref<ISearchParamNew>(cloneDeep(defaultSearch));

  /**
   *
   * @param flag true为重置
   */
  const handleSearch = async (flag?: boolean) => {
    if (flag) {
      searchParam.value = cloneDeep(defaultSearch);
    }
    await store.dispatch("productNewStore/fetchProductNew", {
      ...searchParam.value,
      ssid: userInfo.ssid,
    });
  };

  return { searchParam, handleSearch };
}
