/*
 * @Author: Cram
 * @Date: 2022-06-17 10:55:19
 */
export const UserLocal: string = "userLocal";

export interface ILoginUser {
  userInfo: IUserInfo;
  userLoading: boolean;
}

export interface IUserInfo {
  userName: string;
  userRank: boolean;
}
