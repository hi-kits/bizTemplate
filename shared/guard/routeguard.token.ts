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
import { CanActivate,Router,ActivatedRoute} from '@angular/router';
// 标题组件
import { ValidatorAction } from '@shared/services/app.validator.services';
// APP参数
import { AppParam } from '@user';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 获取url参数
import { getUrlParams } from '@mid/browser/getUrlParams';
const urlParam = getUrlParams();
@Injectable({
  providedIn: 'root',
})
export class tokenGuard implements CanActivate {

  constructor(
    private validatorAction: ValidatorAction,
    private route: ActivatedRoute,
    private router: Router,
    private appParam: AppParam,
    private httpServices: HttpServices,
  ) { }
  /**
   * 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
   * @fn canActivate
   * @return  boolean
   */
  /* eslint-disable */
  async canActivate(): Promise<boolean> {
    // 置换路由
    // 搜索词管理功能使用
    // 来源有值midbus时，不用请求使用token请求token
    console.log('%c-----------++++++++', 'font-size:35px;color:blue', urlParam);
    // tslint:disable-next-line: no-console
    if (urlParam['resource'] && (urlParam['resource'] === 'nebula' || urlParam['resource'] === 'promotion')) {
      this.appParam.headers['menu-id'] = urlParam['menuID'] || urlParam['menuId'];
      if (!this.appParam.SI) {
        this.appParam.SI = setInterval(async () => {
          // 初始赋值本平台（星云/智家）的token
          this.appParam.headers['X-Access-Token'] = urlParam['token'] || '';
          this.getToken();
        }, 1800000);
        return this.getToken();  
      }
    }else{
      return true;
    }
  }

  // 请求token
  async getToken() {
    /* eslint-disable */
    let { success, message, result } = await this.get('getToken');
    if (success) {
      this.appParam.headers['X-Access-Token'] = result.accessToken || '';
      console.log('----+++---',this.appParam.headers['X-Access-Token']);
      return true;
    } 
    this.router.navigate(['/noPermission']);
    this.appParam.headers['X-Access-Token'] = '';
    return false;
    
  }

  // 获取数据
  get(name, options?: any, callback?: (r) => void, error?: () => void): Promise<any> {
    let HTTP_BODY = { ...options }; // 请求数据
    let URL = ''; // 请求url
    /* eslint-disable */
    let TYPE = null; // 请求类型
    let PARAM_URL = ''; // 参数url
    let METHOD = 'POST'; // 请求方式
    const IS_IGNORE = false; // 是否忽略返回结果
    // 判断参数类型
    if (typeof options === 'function') {
      // tslint:disable-next-line
      /* eslint-disable */
      callback = arguments[1];
      // tslint:disable-next-line
      /* eslint-disable */
      error = arguments[2];
      options = undefined;
    }
    // 搜索词类型
    METHOD = 'GET';
    HTTP_BODY = {
      ...options
    };
    PARAM_URL = 'sys/api/getMpsToken';
    // SERVER_URL 智家运营平台
    // SERVER_URL_NEBULA   星云
    // SERVER_URL_MPS_GW  星海
    switch (urlParam['resource']) {
      case 'promotion':
        URL = environment.paths.SERVER_URL_NO_GATEWAY + 'promotion/sys/user/getMpsToken';
        break;
      case 'nebula':
        URL = environment.paths.SERVER_URL_NEBULA + PARAM_URL;
        break;
      case 'midbus':
        URL = environment.paths.SERVER_URL_MPS_GW + PARAM_URL;
        break;
      default:
        break;
    }
    return this.httpServices.HTTP({
      name,
      type: TYPE,
      method: METHOD,
      url: URL,
      paramUrl: PARAM_URL,
      httpBody: HTTP_BODY,
      // tslint:disable-next-line: only-arrow-functions typedef
      callback: callback || function () { },
      // tslint:disable-next-line: only-arrow-functions typedef
      error: error || function () { },
      isIgnore: IS_IGNORE
    });
  }
}
