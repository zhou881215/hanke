/*
 * @Author: Cram
 * @Date: 2022-06-19 18:01:29
 */
import { ref } from "vue";

export default function () {
  const viewPass = ref<boolean>(false);

  const handleViewPass = () => {
    viewPass.value = !viewPass.value;
  };

  return { viewPass, handleViewPass };
}
