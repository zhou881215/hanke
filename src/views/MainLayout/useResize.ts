/*
 * @Author: Cram
 * @Date: 2022-06-27 16:44:56
 */
import { ref, readonly, provide } from "vue";
import type { Ref } from "vue";
import { throttle } from "../../utils";

export default function () {
  const phoneWidth: number = 768;

  // 是否手机尺寸
  const isPhone: Ref<boolean> = ref<boolean>(false);

  provide("isPhone", readonly(isPhone));

  const recodeWidth = throttle(() => {
    isPhone.value = document.documentElement.clientWidth <= phoneWidth;
  }, 100);

  // 手机端导航
  const drawerFlag: Ref<boolean> = ref<boolean>(false);

  const openDrawer = () => {
    if (isPhone.value) {
      drawerFlag.value = true;
    }
  };

  return { phoneWidth, isPhone, recodeWidth, drawerFlag, openDrawer };
}
