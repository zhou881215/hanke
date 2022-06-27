/*
 * @Author: Cram
 * @Date: 2022-06-27 15:44:47
 */

/**
 * @param func 回调函数
 * @param wait 时间
 * @param flag true输入前执行，false输入后执行
 * @returns
 */
export default (func: Function, wait: number, flag: boolean) => {
  let timer: any = null;
  const debounced = (...args: Array<unknown>) => {
    clearTimeout(timer);
    if (flag) {
      // true 先执行再等待
      if (!timer) {
        func(...args);
      }
      timer = setTimeout(() => (timer = null), wait);
    } else {
      // false 先等待再执行
      timer = setTimeout(() => func(...args), wait);
    }
  };
  //  加个手动取消的方法
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  }; // 取消防抖
  return debounced;
};
