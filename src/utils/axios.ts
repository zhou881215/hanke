/*
 * @Author: Cram
 * @Date: 2022-06-24 10:57:55
 */
import axios from "axios";
import { ElNotification } from "element-plus";

const service = axios.create({
  timeout: 30000, // 请求 30s 超时
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
}); // 创建一个axios的实例

// 响应拦截器
service.interceptors.response.use(({ data: result }: any) => {
  const { status, msg, data } = result;
  const flag: boolean = status === "0";
  if (!flag) {
    ElNotification.error({
      title: "出错了！",
      message: msg || "权限不足，请输入关键词重试",
    });
  }
  return { flag, response: flag ? data : msg };
});

export default service;
