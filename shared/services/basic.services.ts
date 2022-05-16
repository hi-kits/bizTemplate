/**
 * 基础服务
 * @class BasicServices
 * @version 0.0.1
 * @author by fico on 2018/06/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 缓存headers参数
 */
import { Injectable } from '@angular/core';
// APP参数
import { AppParam } from '@user';
// 获取url参数
import { getUrlParams } from '@mid/browser/getUrlParams';
const urlParam = getUrlParams();

@Injectable({
  providedIn: 'root',
})
export class BasicServices {
  constructor(
    private appParam: AppParam
  ) {}
  // 初始化
  init(pageId): void {
    this.appParam.headers.pageId = urlParam['menuId'] || pageId || '';
    // tslint:disable-next-line: no-string-literal
    this.appParam.headers['X-Access-Token'] = urlParam['token'] || '';
    // tslint:disable-next-line: no-string-literal
  }
  // message(type, text): void {}

}
