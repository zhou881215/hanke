/*
 * @Author: Cram
 * @Date: 2022-06-19 17:13:54
 */
import { ref } from "vue";
import { useStore } from "vuex";
import type { IUserInfo } from "../../api/loginApi";
import type { IFetchUser } from "../../api/userApi";

export default function (userInfo: IUserInfo) {
  const store = useStore();

  const fetchParam = ref<IFetchUser>({
    pageSize: 10,
    p: 1,
    ssid: userInfo.ssid,
  });

  const handleFetch = async () => {
    await store.dispatch("userStore/fetchUser", fetchParam.value);
  };

  const handleDelete = async (id: string) => {
    const isSucceed: boolean = await store.dispatch("userStore/deleteUser", {
      id,
      ssid: userInfo.ssid,
    });
    isSucceed && (await handleFetch());
  };

  return { fetchParam, handleFetch, handleDelete };
}
