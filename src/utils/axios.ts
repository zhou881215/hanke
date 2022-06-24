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
service.interceptors.response.use((response: any) => {
  if (response.status !== 0) {
    ElNotification({
      title: "出错了！",
      message: response.msg,
      type: "error",
    });
    return null;
  }
  return response;
});

export default service;
