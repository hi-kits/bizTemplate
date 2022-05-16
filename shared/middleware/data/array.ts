/**
 * 数组去重
 * @fn Purge
 * @version 0.0.1
 * @author by zengshufang on 2021/12/20
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function unique(arr): any {
  return Array.from(new Set(arr));
}
export function remove(arr, item): any {
  const INDEX = arr.indexOf(item);
  if (INDEX > -1) {
    arr.splice(INDEX, 1);
  }
  return arr;
}