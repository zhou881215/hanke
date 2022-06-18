/*
 * @Author: Cram
 * @Date: 2022-06-18 23:37:07
 */
export function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
