/*
 * @Author: Cram
 * @Date: 2022-06-19 17:13:54
 */
import { ref } from "vue";
import { useStore } from "vuex";

interface IFetchUser {
  pageSize: number;
  pageNo: number;
}

export default function () {
  const store = useStore();

  const fetchParam = ref<IFetchUser>({
    pageSize: 10,
    pageNo: 1,
  });

  const handleFetch = async () => {
    await store.dispatch("userStore/fetchUser", fetchParam.value);
  };

  const handleDelete = async () => {
    await store.dispatch("userStore/deleteUser");
    await handleFetch();
  };

  return { fetchParam, handleFetch, handleDelete };
}
