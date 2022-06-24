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
  loginId: "";
  loginPwd: "";
  loginPwdCheck: "";
  loginPhone: "";
  loginAuth: "";
}

// 重置
export interface IRecoverInfo {
  loginPwd: "";
  loginPwdCheck: "";
  loginPhone: "";
  loginAuth: "";
}

export function delay(duration: number) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const loginInApi = async (params: ILoginData) =>
  await axios.post("/Api/Login/loginIn", params);
