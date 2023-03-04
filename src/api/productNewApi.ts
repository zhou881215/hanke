import { axios } from "../utils";

/**
 * 查询产品列表
 */
export declare interface ISearchParamNew {
  bindname: string;
  title: string;
  xm: string;
  bz: string;
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
  title: string;
  xm: string;
  bz: string;
  cnas: string;
  cma: string;
  gys: string;
  tel: string;
  city: string;
  price: string;
  oprice: string;
  jc: string;
  pdbz: string;
  ypxq: string;
  zxyp: string;
  testway: string;
  zhouqitype: string;
  jiancezhouqi: string;
  xuzhi: string;
  istest: string;
  zhiyangzhouqi: string;
  zhuyangfei: string;
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
