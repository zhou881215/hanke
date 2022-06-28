/*
 * @Author: Cram
 * @Date: 2022-06-27 16:44:56
 */
import { ref, readonly, provide, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { throttle } from "../../utils";

export default function () {
  const phoneWidth: number = 992;

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

  // 分页展示栏目
  const paginationLayout: ComputedRef<string> = computed(() =>
    isPhone.value
      ? "total, prev, next, jumper"
      : "total, sizes, prev, pager, next, jumper"
  );
  provide("paginationLayout", readonly(paginationLayout));

  return { phoneWidth, isPhone, recodeWidth, drawerFlag, openDrawer };
}
