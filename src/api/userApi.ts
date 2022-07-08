/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:20
 */
import { axios } from "../utils";

export interface IFetchUser {
  pageSize: number;
  p: number;
}

export interface IUpdateUser {
  id: number;
  status: "0" | "1";
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
// 用户详情-响应数据
export interface IUserDetailInfo {
  id: string;
  username: string;
  phone: string;
  regdate: string;
  status: "0" | "1"; // 是否审核，0 -> 未审核；1 -> 审核
}

export interface IUserLog {
  loginTime: string; // 登录时间
  visitLog: Array<string>; // 查看记录
  searchLog: Array<string>; // 搜索记录
}

export interface IUserDetail {
  userinfo: IUserDetailInfo;
  logdata: Array<IUserLog>;
}

/**
 * 查询用户列表
 */
export const fetchUserApi = async (params: IFetchUser) =>
  await axios.post("http://test.zanbox.net/Api/Users/fetchUser", params);

/**
 * 删除用户
 */
export const deleteUserApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Users/deleteUser", { id });

/**
 * 查询用户详情
 */
export const fetchSingleUserApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Users/fetchSingleUser", {
    id,
  });

/**
 * 更新用户
 */
export const updateSingleUserApi = async (params: IUpdateUser) =>
  await axios.post("http://test.zanbox.net/Api/Users/updateSingleUser", params);

/**
 * 下载日志
 */
export const downloadLogApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Users/downloadLog", { id });
