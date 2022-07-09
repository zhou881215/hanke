/*
 * @Author: Cram
 * @Date: 2022-06-18 22:16:12
 */
import { axios } from "../utils";
import type { ISsid } from "./loginApi";

/**
 * 查询产品类别
 */
// 产品类别接口-响应数据
export interface ICategoryOptions {
  id: string;
  name: string;
}
export const fetchProductCategoryApi = async (
  params: ISsid
): Promise<Array<ICategoryOptions>> =>
  await axios.post(
    "http://test.zanbox.net/Api/Product/fetchProductCategory",
    params
  );

/**
 * 查询产品列表
 */
export interface ISearchParam {
  jcbz: string;
  jcxm: string;
  lb: string;
  cpmc: string;
  pageSize: number;
  p: number;
}

// 产品接口-响应数据
export interface IProduct {
  id?: string;
  xh: string | number;
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
export interface IProductData {
  list: Array<IProduct>;
  count: string;
}
export const fetchProductApi = async (
  params: ISearchParam
): Promise<IProductData> =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchProduct", params);

/**
 * 查询当日新增
 */
// 产品接口-响应数据
export interface ICurrentToday {
  todaycount: string;
  totalcount: string;
}
export const fetchCurrentTotalApi = async (
  params: ISsid
): Promise<ICurrentToday> =>
  await axios.post(
    "http://test.zanbox.net/Api/Product/fetchCurrentTotal",
    params
  );

/**
 * 查询单条产品详情
 */
export interface IFetchDetail {
  xh: number;
  ssid: string;
}
export const fetchDetailApi = async (params: IFetchDetail): Promise<IProduct> =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchDetail", params);

/**
 * 新增\更新单条产品
 */
export const saveSingleProductApi = async (
  params: IProduct
): Promise<unknown> =>
  await axios.post(
    "http://test.zanbox.net/Api/Product/saveSingleProduct",
    params
  );
