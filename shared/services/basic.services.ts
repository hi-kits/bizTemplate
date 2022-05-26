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
    private appParam: AppParam,
  ) { }

  // 初始化
  init(pageId): void {
    console.log('----$$$$-',urlParam['menuId']);
    this.appParam.headers.pageId = urlParam['menuId'] || pageId || '';
    this.appParam.headers['X-Access-Token'] = urlParam['token'] || '';
    this.appParam.headers['tenant-id'] = urlParam['tenantId'] || '';
    this.appParam.headers['X-TIMESTAMP'] = this.getDateTimeToString();
  }

  getDateTimeToString() {
    const date_ = new Date();
    const year = date_.getFullYear();
    let month: any = date_.getMonth() + 1;
    let day: any = date_.getDate();
    /* eslint-disable */
    if (month < 10) month = '0' + month;
    /* eslint-disable */
    if (day < 10) day = '0' + day;
    let hours: any = date_.getHours();
    let mins: any = date_.getMinutes();
    let secs: any = date_.getSeconds();
    const msecs = date_.getMilliseconds();
    /* eslint-disable */
    if (hours < 10) hours = '0' + hours;
    /* eslint-disable */
    if (mins < 10) mins = '0' + mins;
    /* eslint-disable */
    if (secs < 10) secs = '0' + secs;
    /* eslint-disable */
    if (msecs < 10) secs = '0' + msecs;
    return year + '' + month + '' + day + '' + hours + '' + mins + '' + secs;
  }
}
