/*
 * @Author: Cram
 * @Date: 2022-06-24 10:57:55
 */
import axios from "axios";
import { ElNotification } from "element-plus";

const service = axios.create({
  timeout: 30000, // 请求 30s 超时
}); // 创建一个axios的实例

// 响应拦截器
service.interceptors.response.use(({ data: result }: any) => {
  const { status, msg, data } = result;
  if (+status !== 0) {
    ElNotification.error({
      title: "出错了！",
      message: msg,
    });
    return { flag: false, response: msg };
  }
  return { flag: true, response: data };
});

export default service;
