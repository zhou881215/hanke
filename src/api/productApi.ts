/*
 * @Author: Cram
 * @Date: 2022-06-18 22:16:12
 */
import { axios } from "../utils";

export interface IProduct {
  id?: string;
  xh: string;
  lb: string;
  cpmc: string;
  jcxm: string;
  xmbm: string;
  jcbz: string;
  bzmc: string;
  jcx: string;
  pdbz: string;
  ypxq: string;
  zxypl: string;
  csyq: string;
  zqlx: string;
  jczq: string;
  bz: string;
  cb: string;
  cma: string;
  cnas: string;
  jdxz: string;
  gys: string;
  sfzy: string;
  zyzq: string;
  ztfy: string;
  [key: string]: any;
}

export interface ISearchParam {
  jcbz: string;
  jcxm: string;
  lb: string;
  cpmc: string;
  pageSize: number;
  pageNo: number;
}

/**
 * 登录
 */
export const fetchProductApi = async (params: ISearchParam) =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchProduct", params);
