/**
 * 字典服务
 * @class DictionaryServices
 * @version 0.0.1
 * @author by fico on 2019/01/24
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 统一字典接口调用。
 * 返回字典info对象。
 */
import { Injectable } from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
import { type } from 'os';

@Injectable({
  providedIn: 'root',
})
export class DictionaryServices {
  constructor(
    private httpServices: HttpServices,
  ) { }
  /** 字典信息 */
  private _info: { [x: string]: any; } = {};
  public get info(): object {
    return this._info;
  }
  public set info(value) {
    if (this.SetupState) {
      this.SetupState = false;
      this._info = value;
    }
  }
  /** 设置状态 */
  private SetupState = false;
  /**
   * 初始化
   * @function init
   * @param value { Array<any> } 需要请求字典的名称 如 ['APPID'...]
   * @param url { string | boolean } 接口链接或者接口方式变更
   * @returns { Promise<any> }  返回Promise对象
   */
  init(value: any[], url?: string | boolean | 0 | 1 | 2 | 3): Promise<any> {
    /* eslint-disable */
    return new Promise(async (resolve, reject) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < value.length; i++) {
        const ELEMENT = value[i];
        if (!this.info[ELEMENT]) {
          this.info[ELEMENT] = await new Promise((RESOLVE, REJECT) => {
            this.HTTP({ type: ELEMENT, url }, (ResultData) => {
              this.SetupState = true;
              RESOLVE(typeof url === 'string' ? ResultData.result : ResultData.result);
            }, (error) => {
              this.SetupState = true;
              REJECT(error);
            });
          });
        } else {
          resolve(this.info);
        }
      }
      resolve(this.info);
    });
  }
  /**
   * 获取单个字典
   * @function get
   * @param name string 需要请求字典的名称 如 'APPID'
   * @returns { Promise<any> }  返回Promise对象
   */
  async get(name: string, url?: string | boolean): Promise<any[]> {
    return await new Promise((resolve, reject) => {
      resolve(this.init([name], url));
    });
  }
  /**
   * 获取字典信息
   * @function get
   * @param { Object } options 请求参数对象
   * @param { string } options.type 字典名称
   * @param { Function } callback 成功回调
   * @param { Function } error 失败回调
   * @private
   */
  private HTTP(options, callback?: (r) => void, error?: (r) => void): void {
    let httpBody = {};
    let paramURL = ''; // 参数url
    if (typeof options.url === 'string') {
      // 自定义自动接口
      httpBody = { code: options.type };
      paramURL = options.url;
    } else if (typeof options.url === 'boolean') {
      // post 字典接口
      httpBody = { code: options.type };
      paramURL = 'appbm/common/dictionary';
    } else if (options.url === 0) {
      paramURL = environment.paths.SERVER_URL_SCORD + 'common/' + options.type + '/dictionary';
      // 一站式字典
    } else if (options.url === 1) {
      paramURL = environment.paths.SERVER_URL_ONESTOP.split('appmanage')[0] + 'plugins/dict/data/loadDict?dictCode=' + options.type;
    } else if (options.url === 2) {
      // 内容平台字典
      httpBody = { type: options.type };
      paramURL = environment.paths.SERVER_URL_NEBULA_GW + 'synomsscp/common/v1/dictionary';
    } else if (options.url === 3) {
      // 星云平台字典
      paramURL = environment.paths.SERVER_URL_NEBULA + 'sys/dictItem/listByCode?code=' + options.type;
    } else {
      httpBody = { dictCode: options.type };
      paramURL = 'plugins/dict/data/loadDict';
    }
    this.httpServices.HTTP({
      name: options.type,
      type: 'noLimit',
      method: options.url && options.url === 2 ? 'post' : 'get', // 请求方式
      url: paramURL, // 请求url
      paramUrl: paramURL, // 参数url
      httpBody, // 请求数据
      callback: callback || ((r) => { }),
      error: error || ((r) => { }),
      isIgnore: false // 是否忽略返回结果
    });
  }
}
