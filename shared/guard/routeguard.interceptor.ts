/**
 * 路由守卫
 * @class RouteguardService
 * @version 0.1.0
 * @author by fico on 2019/05/24
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable } from '@angular/core';
// 路由相关模块
import { CanActivate } from '@angular/router';
// 标题组件
import { ValidatorAction } from '@shared/services/app.validator.services';

@Injectable({
  providedIn: 'root',
})
export class RouteguardService implements CanActivate {

  constructor(
    private validatorAction: ValidatorAction,
  ) { }
  /**
   * 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
   * @fn canActivate
   * @return  boolean
   */
  canActivate(): boolean {
    // tslint:disable-next-line: no-console
    console.info('[isAuth]:', this.validatorAction.isValidator);
    if (!this.validatorAction.isValidator) {
      return true;
    }
    // 鉴权返回
    // tslint:disable-next-line: no-string-literal
    return this.validatorAction.getValidator['then'](() => {
      return true;
    }).catch(() => {
      return false;
    });
  }
}
