/**
 * 鉴权验证
 * @class ValidatorAction
 * @version 0.0.1
 * @author by fico on 2019/01/24
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 统一鉴权验证，返回验证结果。
 * 提供 sort 鉴权运算。
 */
import { Injectable } from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 操作菜单接口
import { Power } from '@int/tabular';
// 获取url参数
import { getUrlParams } from '@mid/browser/getUrlParams';
const urlParam = getUrlParams();

@Injectable({
  providedIn: 'root',
})
export class ValidatorAction {
  constructor(
    private httpServices: HttpServices,
  ) { }
  // Promise
  private Promise;
  /** 是否进行验证 */
  private IsValidator = true;
  public get isValidator(): boolean {
    return this.IsValidator;
  }
  public set isValidator(value: boolean) {
    if (value && this.IsReady) {
      this.Promise = this.get((ResultData) => {
        this.getValidator = ResultData;
      }, (error) => {
        this.getValidator = error;
      });
    } else if (!value) { // 项目全局文件app.parameter.ts参数中验证权限IS_VALIDATOR为false时走此逻辑，否则控制台报错，列表无法正常展示
      this.Promise = new Promise((resolve) => {
        this.getValidator = [];
        resolve(null);
      });
    }
    this.IsValidator = value;
  }
  /** 是否请求 */
  private IsReady = true;
  private GetValidator;
  /** 获取鉴权信息
   * @ 返回 Promise 对象
   */
  get getValidator(): { [x: string]: any } {
    return new Promise(resolve => {
      if (!this.isValidator) {
        resolve(null);
      } else {
        this.Promise.then(() => {
          resolve(this.GetValidator);
        });
      }
    });
  }
  set getValidator(value: { [x: string]: any }) {
    if (this.IsReady) {
      this.IsReady = false;
      this.GetValidator = value;
    }
  }
  /**
   * 鉴权认证 逻辑运算
   * @fn sort
   * @param  Object  power 成功回调
   * @param  Function  error 失败回调
   * @inner
   * @returns  Array<any>  根据用户信息状态返回显示运算结果
   */
  sort(power: Power): any[] {
    const RESULT = [];
    if (!this.GetValidator) {
      return undefined;
    }
    const OPTION = this.GetValidator.result || [];
    Object.keys(power).forEach((key) => {
      // 项目全局文件app.parameter.ts参数中验证权限IS_VALIDATOR为false时，默认展示所有按钮
      if (!this.IsValidator) {
        power[key].type = true;
        // 如果直接return出去的话，类似编辑的这种按钮无法走到下方126行中，列表上就展示不了编辑按钮，因此需要加上下方代码
        if (power[key].bind) {
          RESULT.push(power[key].bind);
        }
        return;
      }
      if (OPTION.length === 0) {
        power[key].type = false;
      } else {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < OPTION.length; i++) {
          const item = OPTION[i];
          if (item.action === power[key].code || item.describe === power[key].name) {
            power[key].type = true;
            break;
          }

          power[key].type = false;
        }
      }
      // OPTION.every((item) => {
      //     if (item.action === power[key].code || item.describe === power[key].name) {
      //         power[key].type = true;
      //         // 跳出循环
      //         return false;
      //     } else {
      //         power[key].type = false;
      //         // 跳出本次循环
      //         return true;
      //     }
      //     // if (item.describe === power[key].name) {
      //     //     power[key].type = item.type  === 2 ? false : true;
      //     // }
      // });
      if (power[key].type && power[key].bind) {
        RESULT.push(power[key].bind);
      }
    });
    return RESULT;
  }

  /**
   * 获取用户信息
   * @param  Function  callback 成功回调
   * @param  Function  error 失败回调
   * @inner
   * @returns  Promise<any>  返回Promise对象
   */
  get(callback?: (r) => void, error?: (r) => void): Promise<any> {
    /* eslint-disable */
    let paramUrl;
    /* eslint-disable */
    let url;
    let httpBody = null;
    if (window.location.href.indexOf('nebula') > -1){
      // 星云系统
      paramUrl = 'sys/api/menu/btn';
      url = environment.paths.SERVER_URL_NEBULA + paramUrl + '?headerMenuId=' + urlParam['menuId'];
    } else if (window.location.href.indexOf('onestop') > -1) {
      // 一站式1474013365585944577 1463083345787068418
      //  paramUrl = 'syn/event/analyse/sys/permission/getMenuButton?id=1474013365585944577'; // 参数url
      paramUrl = 'syn/event/analyse/sys/permission/getMenuButton'; // 参数url
      url = environment.paths.SERVER_URL_NO_GATEWAY + paramUrl;
      httpBody = { id: urlParam['menuId'] || '' };
    }  else {
      // 智家运营后台
      paramUrl =  'promotion/sys/permission/getMenuButton';
      url = environment.paths.SERVER_URL_NO_GATEWAY + paramUrl;
      httpBody = { id: urlParam['menuId'] || '' };
    }
    return this.httpServices.HTTP({
      name: 'validator',
      method: 'get', // 请求方式
      url, // 请求url
      paramUrl, // 参数url
      httpBody, // 请求数据
      callback: callback || ((r) => { }),
      error: error || ((r) => { }),
      isIgnore: false // 是否忽略返回结果
    });
  }
}
