/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:20
 */
import { axios } from "../utils";

export interface IFetchUser {
  pageSize: number;
  p: number;
}

// 用户列表-响应数据
export interface IUser {
  id: string;
  userName: string;
  userPass: string;
  phoneNumber: string;
  regdate: string;
  isAudit: boolean;
}

// 用户详情-响应数据
export interface ITrack {
  loginTime: string;
  visitLog: Array<string>;
  searchLog: Array<string>;
}

export interface IUserDetail extends IUser {
  userTrack: Array<ITrack>;
}

/**
 * 查询用户列表
 */
export const fetchUserApi = async (params: IFetchUser) =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchUser", params);

/**
 * 删除用户
 */
export const deleteUserApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Product/deleteUser", { id });

/**
 * 查询用户详情
 */
export const fetchSingleUserApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchSingleUser", {
    id,
  });

/**
 * 更新用户
 */
export const updateSingleUserApi = async (params: IUser) =>
  await axios.post(
    "http://test.zanbox.net/Api/Product/updateSingleUser",
    params
  );

/**
 * 下载日志
 */
export const downloadLogApi = async (id: string) =>
  await axios.post("http://test.zanbox.net/Api/Product/downloadLog", { id });
