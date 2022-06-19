/*
 * @Author: Cram
 * @Date: 2022-06-19 16:47:20
 */
export interface IUser {
  id: string;
  userName: string;
  userPass: string;
  regdate: string;
  isAudit: boolean;
}

export interface ITrack {
  loginTime: string;
  visitLog: Array<string>;
  searchLog: Array<string>;
}

export interface IUserDetail extends IUser {
  userTrack: Array<ITrack>;
}
