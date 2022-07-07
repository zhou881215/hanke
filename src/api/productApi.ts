/*
 * @Author: Cram
 * @Date: 2022-06-18 22:16:12
 */
import { axios } from "../utils";

export interface ISearchParam {
  jcbz: string;
  jcxm: string;
  lb: string;
  cpmc: string;
  pageSize: number;
  p: number;
}

// 产品类别接口-响应数据
export interface ICategoryOptions {
  id: string;
  name: string;
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

// 产品接口-响应数据
export interface ICurrentToday {
  todaycount: string;
  totalcount: string;
}
/**
 * 查询产品类别
 */
export const fetchProductCategoryApi = async () =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchProductCategory");

/**
 * 查询产品列表
 */
export const fetchProductApi = async (params: ISearchParam) =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchProduct", params);

/**
 * 查询当日新增
 */
export const fetchCurrentTotalApi = async () =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchCurrentTotal");

/**
 * 查询单条产品详情
 */
export const fetchDetailApi = async (xh: string) =>
  await axios.post("http://test.zanbox.net/Api/Product/fetchDetail", {
    xh: +xh,
  });

/**
 * 新增\更新单条产品
 */
export const saveSingleProductApi = async (params: IProduct) =>
  await axios.post(
    "http://test.zanbox.net/Api/Product/saveSingleProduct",
    params
  );
