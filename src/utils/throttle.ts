/*
 * @Author: Cram
 * @Date: 2022-06-27 15:51:34
 */

/**
 * @param func 回调函数
 * @param wait 时间
 * @returns
 */
export default (func: Function, wait: number) => {
  let timer: any;
  return (...args: Array<unknown>) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, wait);
    }
  };
};
