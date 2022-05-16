/**
 * http 拦截器
 * @class NoopInterceptor
 * @version 0.0.6
 * @author by fico on 2018/02/09
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 *      拦截所以 http 请求，并在请求前修正参数
 *      根据返回结果执行回调处理
 */
/* eslint-disable */
import { Injectable } from '@angular/core';
// http 服务
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// 异步编程库
import { Observable, of } from 'rxjs';
// import { catchError,  mergeMap } from 'rxjs/operators';
import { catchError, mergeMap } from 'rxjs/operators';
// import 'rxjs/add/operator/do';
// 环境配置
import { environment } from '@env/environment';
import { AppParam } from '@shared/user';
// 获取url参数
import { getUrlParams } from '@mid/browser/getUrlParams';
const urlParam = getUrlParams();

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  /**
   * 缓存请求接口的数组
   * @property { Array<any> }
   * @private
   */
  private URL_ARRAY = [];
  constructor(
    private appParam: AppParam
  ) { }
  /**
   * 判断是否已经下线
   * @function offline
   * @param { string } retInfo 返回信息
   * @returns { boolean } 返回下线状态
   */
  private offline(retInfo): boolean {
    return RegExp(/Token失效/, 'g').test(retInfo);
  }
  /**
   * 登陆状态处理
   */
  private loginStatus(BODY): void {
    const RETCODE = ['500'];
    if (RETCODE.includes(BODY.status) || this.offline(BODY.message) ||
      (RETCODE.includes(BODY.status) && this.offline(BODY.message) || this.offline(BODY.msg))
    ) {
      setTimeout(() => {
        if (window.location.href.indexOf('onestop') > -1) {
          // 一站式登录页面
          window.parent.location.href = window.location.origin + '/publishing/index.html?language=zhCN#/load/loading';
        } else {
          // 运营后台登录页面
          window.parent.location.href = window.location.origin + '/promotion/index.html?language=zhCN#/load/loading';
        }
      }, 1000);
    }
  }
  /**
   * 返回结果处理
   * @function handleData
   * @param { string } event 返回结果数据对象
   * @private
   * @returns { Object } 返回处理后的结果数据对象
   */
  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // this.injector.get(_HttpClient).end();
    const BODY: any = event instanceof HttpResponse && event.body;
    // 业务处理：一些通用操作
    // tslint:disable-next-line: switch-default
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下假如响应体的 `status` 若不为 `0` 表示业务级异常
        // 并显示 `error_message` 内容
        this.loginStatus(BODY);
        break;
      case 401: // 未登录状态码
        // this.goTo('/passport/login');
        // console.info('[未登录状态码]');
        break;
      case 403:
      case 404:
      case 500:
        this.loginStatus(BODY);
        // 404
        // tslint:disable-next-line: no-console
        console.info('[请求无效]');
        console.groupEnd();
        break;
      default:
        break;
    }
    return of(event);
  }
  /**
   * 返回结果处理
   * @function intercept
   * @param { Object } req 请求对象
   * @param { Object } next
   * @returns { Object } 返回处理后的结果数据对象
   */
  // cyclomatic-complexity 规则：复杂的或难以修改的函数
  // tslint:disable-next-line:cyclomatic-complexity
  /* eslint-disable */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let URL = req.url;
    // startsWith 判断当前字符串是否以 https:// 或 http:// 作为开头
    if (!URL.startsWith('https://') && !URL.startsWith('http://') && !/i18n/.test(URL)) {
      URL = environment.origin ? environment.paths.SERVER_URL + URL : environment.paths.SERVER_URL + URL;
    }
    // 设置 Headers
    // tslint:disable-next-line: no-console
    console.info('HttpUrl :', req.url);
    // tslint:disable-next-line: no-console
    console.info('method  :', req.method);
    // tslint:disable-next-line: no-console
    console.info('headers :', req.headers);
    // tslint:disable-next-line: no-console
    console.info('HttpBody:', req.body);
    // console.table(req.body);
    let HEADERS = {};
    // tslint:disable-next-line: no-string-literal
    if (req['urlType'] === 'upload' ||
      URL.indexOf('/inp/pacakge') > -1 ||
      URL.indexOf('/plugins/fileUpload') > -1 ||
      URL.indexOf('/pushmsg/upload') > -1 ||
      URL.indexOf('/image/upload') > -1 ||
      URL.indexOf('/common/upload') > -1 ||
      URL.indexOf('/fileUpload/pictureUpload') > -1 ||
      URL.indexOf('/fileUpload/docUpload') > -1 ||
      URL.indexOf('/fileUpload/videoUpload') > -1 || 
      URL.indexOf('/shm/reslocal/appletPromot/import') > -1 || 

      URL.indexOf('/file/upload') > -1) {
      HEADERS = { ...this.appParam.headers };
    } else {
      HEADERS = { ...this.appParam.headers, 'Content-Type': 'application/json;charset=utf-8' };
    }
    // 星云平台按钮权限
    if (URL.indexOf('headerMenuId') > -1 || URL.indexOf('nebula') > -1) {
      // tslint:disable-next-line: no-string-literal
      HEADERS = { ...HEADERS, 'menu-id': urlParam['menuId'] };
    }
    // 星云平台导出
    // 增加代码 && window.localStorage.getItem('pro__Access-Token')，否则原先的营销推广平台的导出接口包含export时，会走到这里，控制台报错，进而导出功能失败
    // URL.indexOf('export') > -1

    // ！注意！注意！注意
    // ！注意！注意！注意
    // ！注意！注意！注意
    // 下面的代码已经迁移至项目内的app.action.ts中的interceptorCallback回调中，如需要添加参考projects/ActivityAudit 项目
    // if (req['urlType'] === 'exportWithXToken' && window.localStorage.getItem(window.parent.location.pathname + 'pro__Access-Token')) {
    //     HEADERS = {
    //       ...HEADERS,
    //       'X-Access-Token': JSON.parse(window.localStorage.getItem(window.parent.location.pathname + 'pro__Access-Token'))?.value};
    //   }
    // ！注意！注意！注意
    // ！注意！注意！注意
    // ！注意！注意！注意
    if (req['interceptorCallback']) {
      HEADERS = req['interceptorCallback'](req, HEADERS);
      
    }
    const CHANGED_REQ = req.clone({
      url: URL,
      setHeaders: { ...HEADERS }
    });
    // 如果在url数组中有请求链接，直接返回
    if (this.URL_ARRAY.indexOf(URL) > -1) { return undefined; }
    // 添加url到数组中 非字典接口
    // tslint:disable-next-line: no-string-literal
    if (req['urlType'] !== 'noLimit') {
      this.URL_ARRAY.push(URL);
    }
    // 清空url数组
    setTimeout(() => { this.URL_ARRAY = []; }, 250);
    // 执行 http 请求
    return next.handle(CHANGED_REQ).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      // catchError((err: HttpErrorResponse) => this.handleData(err))
      catchError((res: HttpResponse<any>) => {
        // 请求失败处理
        return this.handleData(res);
      })
    );

  }
}
