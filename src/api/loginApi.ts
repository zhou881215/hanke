/*
 * @Author: Cram
 * @Date: 2022-06-18 03:13:45
 */
import { axios } from "../utils";

// 登录
export interface ILoginData {
  loginId: string;
  loginPwd: string;
}

// 注册
export interface IRegisterInfo {
  loginId: string;
  loginPwd: string;
  loginPwdCheck: string;
  loginPhone: string;
  loginAuth: string;
}

// 重置
export interface IRecoverInfo {
  loginPwd: string;
  loginPwdCheck: string;
  loginPhone: string;
  loginAuth: string;
}

export function delay(duration: number) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * 登录
 */
export const loginInApi = async (params: ILoginData) =>
  await axios.post("http://test.zanbox.net/Api/Login/loginIn", params);

/**
 * 注销
 */
export const loginOutApi = async () =>
  await axios.post("http://test.zanbox.net/Api/Login/loginOut");

/**
 * 发验证码
 */
export const getAuthCodeApi = async (phone: string) =>
  await axios.post("http://test.zanbox.net/Api/Login/getAuthCode", { phone });

/**
 * 注册
 */
export const userRegisterApi = async (params: IRegisterInfo) =>
  await axios.post("http://test.zanbox.net/Api/Login/userRegister", params);

/**
 * 找回密码
 */
export const recoverPassApi = async (params: IRecoverInfo) =>
  await axios.post("http://test.zanbox.net/Api/Login/recoverPass", params);
