/*
 * @Author: Cram
 * @Date: 2022-06-18 03:13:45
 */
export interface ILoginData {
  loginId: string;
  loginPwd: string;
}

export interface IRegisterInfo {
  loginId: "";
  loginPwd: "";
  loginPwdCheck: "";
  loginPhone: "";
  loginAuth: "";
}

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
