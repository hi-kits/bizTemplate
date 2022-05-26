/*
* 项目参数
 * @class: AppParameter
 * @Author: yzy
 * @Date: 2020-05-27 08:38:14
 * @Last Modified by: yzy
 * @Last Modified time: 2020-10-14 17:33:56
 */

import { Injectable } from '@angular/core';
import { Params } from '@int/params';

interface AppInfo {
  readonly pageId: string;
  readonly title: string;
  readonly isValidator?: boolean;
  readCache?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppParameter {
  [x: string]: any;
  // 信息
  readonly info: AppInfo = {
    // 页面标识
    pageId: 'searchWords',

    // 标题
    title: '搜索词管理',
    // 是否需要验证权限
    isValidator: false,
    // 是否缓存数据
    readCache: false
  };
  // 当前操作项对象
  readonly currentItem = {
    view: {},
    viewPage: {
      index: 0, // 页面索引
      size: 20, // 页面数据条数
    },
    content: {},
    funContent: {},
    // 逻辑详情
    LogicDetailList: [],
    // 当前数据类型
    dataType: null,
  };

  /* ------------ select选项 ------------ */
  readonly option: Params = {
    blackType: [],
    provinceList:[],
    listOfOption:[],
    listOfChannel:[]
  };
}
