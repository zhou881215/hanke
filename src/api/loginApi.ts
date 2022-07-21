/*
 * @Author: Cram
 * @Date: 2022-06-18 03:13:45
 */
import { axios } from "../utils";

/**
 * 登录
 */
export interface ILoginData {
  loginId: string;
  loginPwd: string;
}
// 登录接口-响应数据
export interface IUserInfo {
  userName: string;
  userRank: string;
  ssid: string;
}
export const loginInApi = async (params: ILoginData): Promise<IUserInfo> =>
  await axios.post("http://admin.test-database.com/Api/Login/loginIn", params);

/**
 * 注销
 */
export interface ISsid {
  ssid: string;
}
export const loginOutApi = async (params: ISsid): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Login/loginOut", params);

/**
 * 发验证码
 */
export const getAuthCodeApi = async (phone: string): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Login/getAuthCode", { phone });

/**
 * 注册
 */
export interface IRegisterInfo {
  loginId: string;
  loginPwd: string;
  loginPwdCheck: string;
  loginPhone: string;
  loginAuth: string;
}
export const userRegisterApi = async (
  params: IRegisterInfo
): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Login/userRegister", params);

/**
 * 找回密码
 */
export interface IRecoverInfo {
  loginPwd: string;
  loginPwdCheck: string;
  loginPhone: string;
  loginAuth: string;
}
export const recoverPassApi = async (params: IRecoverInfo): Promise<unknown> =>
  await axios.post("http://admin.test-database.com/Api/Login/recoverPass", params);
