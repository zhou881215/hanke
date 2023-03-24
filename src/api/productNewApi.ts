import { axios } from "../utils";

/**
 * 查询产品列表
 */
export declare interface ISearchParamNew {
  lb: string;
  cpmc: string;
  jcxm: string;
  jcbz: string;
  city?: string;
  pageSize: number;
  p: number;
  ssid?: string;
  [k: string]: any;
}

// 产品接口-响应数据
export declare interface IProductNew {
  id?: string;
  xh: string | number;
  bindname: string;
  cpmc: string;
  jcxm: string;
  jcbz: string;
  cnas: string;
  cma: string;
  gys: string;
  tel: string;
  city: string;
  bz: string;
  cb: string;
  jcx: string;
  pdbz: string;
  ypxq: string;
  zxypl: string;
  csyq: string;
  zqlx: string;
  jczq: string;
  jdxz: string;
  sfzy: string;
  zyzq: string;
  ztfy: string;
  [key: string]: any;
}
export declare interface IProductNewData {
  list: Array<IProductNew>;
  count: string;
}
export const fetchProductNewApi = async (
  params: ISearchParamNew
): Promise<IProductNewData> =>
  await axios.post(
    "http://admin.test-database.com/Api/Product/fetchProductNew",
    params
  );
