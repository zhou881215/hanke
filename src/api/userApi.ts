/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:20
 */
import { axios } from "../utils";

/**
 * 查询用户列表
 */
export interface IFetchUser {
  pageSize: number;
  p: number;
  ssid: string;
}
// 用户列表-响应数据
export interface IUser {
  id: string;
  username: string;
  userpass: string;
  phonenumber: string;
  regdate: string; // 注册时间
  status: "0" | "1"; // 是否审核，0 -> 未审核；1 -> 审核
}

export interface IUserData {
  list: Array<IUser>;
  count: string;
}
export const fetchUserApi = async (params: IFetchUser): Promise<IUserData> =>
  await axios.post("http://admin.test-database.com/Api/Users/fetchUser", params);

/**
 * 删除用户
 */
export interface IUserSsid {
  id: string;
  ssid: string;
}
export const deleteUserApi = async (params: IUserSsid): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Users/deleteUser", params);

/**
 * 查询用户详情
 */
// 用户详情-响应数据
export interface IUserDetailInfo {
  id: string;
  username: string;
  phone: string;
  regdate: string;
  status: "0" | "1"; // 是否审核，0 -> 未审核；1 -> 审核
}

export interface ILog {
  content: string;
  id: string;
  logintime: string;
}
export interface IUserLog {
  loginTime: string; // 登录时间
  visitLog: Array<ILog>; // 查看记录
  searchLog: Array<ILog>; // 搜索记录
}

export interface IUserDetail {
  userinfo: IUserDetailInfo;
  logdata: Array<IUserLog>;
}
export const fetchSingleUserApi = async (
  params: IUserSsid
): Promise<IUserDetail> =>
  await axios.post("http://admin.test-database.com/Api/Users/fetchSingleUser", params);

/**
 * 更新用户
 */
export interface IUpdateUser {
  id: number;
  status: "0" | "1";
  ssid: string;
}
export const updateSingleUserApi = async (
  params: IUpdateUser
): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Users/updateSingleUser", params);

/**
 * 下载日志
 */
export const downloadLogApi = async (params: IUserSsid): Promise<string> =>
  await axios.post("http://admin.test-database.com/Api/Users/downloadLog", params);
