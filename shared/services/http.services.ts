/**
 * http服务
 * @class HttpServices
 * @version 0.0.1
 * @author by fico on 2018/06/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable } from '@angular/core';
// http 模块
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from '@angular/common/http';
// APP参数
import { AppParam } from '@user';
// 数据接口
import { HttpOption, ResponseResult, HandleOption } from '@int/types';

// 对象转换
import { stringify } from '@mid/data/string';
// 删除字符串前后空格
import { Trim } from '@mid/data/trim';
// 对象数据净化
import { Purge } from '@mid/data/purgeObject';

@Injectable({
    providedIn: 'root',
})
export class HttpServices {
    constructor(
        private http: HttpClient,
        private appParam: AppParam,
    ) {
    }
    /**
     * 回调操作
     * @function callbackHandle
     * @param { Object } options 返回数据对象
     * @param { Function } successFn 请求成功回调
     * @param { Function } warningFn 请求提醒回调
     * @private
     */
    private callbackHandle(options: HandleOption, successFn?: (Val: HandleOption) => void, warningFn?: (Val: HandleOption) => void): void {
        if (options.type === 'success') {
            // tslint:disable-next-line: no-console
            console.info('Result  :', options.result);
            if (this.appParam.isTestParam || options.result.code === 200 || options.result.retCode === '00000' ||  options.name === 'JSON'
            || options.result.code === 0 ) {
                // 判断返回数据
                if (options.result.result !== null || this.appParam.isTestParam || options.isIgnore ||  options.name === 'JSON') {
                    options.callback(options.result);
                    successFn(options);
                }
                // 针对老接口
                if (options.result.data?.items) {
                    options.callback(options.result);
                    successFn(options);
                }
            } else {
                options.error(options.result);
                warningFn(options);
                options.callback(options.result);
            }
        } else {
            // tslint:disable-next-line: no-console
            console.info('Result  :', options.result);
            options.error(options.result);
        }
    }

    /**
     * 回调操作
     * @function HTTP
     * @param { Object } options 请求数据对象
     * @param { Function } successFn 请求成功回调
     * @param { Function } warningFn 请求提醒回调
     * @returns { Promise<any> }  返回Promise对象
     */
    HTTP(options: HttpOption, successFn?: (Val: HandleOption) => void, warningFn?: (Val: HandleOption) => void): Promise<any> {
        const METHOD = options.method;
        const HEADERS = options.headers;
        // tslint:disable-next-line:no-parameter-reassignment
        successFn = successFn || (() => {});
        // tslint:disable-next-line:no-parameter-reassignment
        warningFn = warningFn || (() => {});
        const RESULT: HandleOption = {
            type: 'success',
            name: options.name,
            result: '',
            callback: options.callback,
            error: options.error,
            isIgnore: options.isIgnore
        };
        if ( options.url.indexOf('loginController') === -1) {
            if (document.getElementById('preloader')) {
                document.getElementById('preloader').style.display = 'none';
            }
        }
        return new Promise((resolve, reject) => {
            // 导出
            if (options.type === 'export') {
                return window.open(options.url);
            }
            console.group('[' + options.name + ' 请求]: (' + options.paramUrl + ')');
            if (this.appParam.isTestParam) {
                this.http.get(window.location.origin + '/assets/test.json?' + (+new Date()) ).subscribe(httpData => {
                    RESULT.result = httpData[options.name] || {code: '00000', retInfo: '操作成功', data: {}};
                    this.callbackHandle(RESULT, successFn, warningFn);
                    resolve(RESULT.result);
                });
                return;
            }
            const HTTP_HEADERS: {} = HEADERS || this.appParam.headers;
            // 对get请求做处理
            if (METHOD.toLowerCase() === 'get' && options.url.indexOf('?') === -1) {
                options.url += '?' + stringify(Trim(Purge(options.httpBody, '')));
            }
            // 接口请求 freeze 冻结请求数据
            const REQUEST = new HttpRequest(METHOD, options.url, Object.freeze(Trim(options.httpBody)), {
                headers: new HttpHeaders(HTTP_HEADERS)
            });
            // tslint:disable-next-line: no-string-literal
            REQUEST['urlType'] = options.type;
            REQUEST['interceptorCallback'] = options.interceptorCallback;
            if (options.type === 'jsonp') {
                // this.http.jsonp<ResponseResult>(options.url, 'callback').subscribe( httpData => {
                //     RESULT.result = httpData;
                //     this.callbackHandle(RESULT, successFn, warningFn);
                //     resolve(httpData);
                // } );
            } else {
                this.http.request<ResponseResult>(REQUEST).subscribe(
                    httpData => {
                        if (httpData.type === HttpEventType.Response) {// 成功
                            RESULT.result = httpData.body;
                            this.callbackHandle(RESULT, successFn, warningFn);
                            resolve(httpData.body);
                        } else {
                            if (httpData.type !== 0) {
                                RESULT.type = 'error';
                                RESULT.result = httpData;
                                this.callbackHandle(RESULT, successFn, warningFn);
                                resolve(httpData);
                            }
                        }
                    },
                    err => {// 失败
                        RESULT.type = 'error';
                        RESULT.result = err;
                        this.callbackHandle(RESULT, successFn, warningFn);
                        reject(err);
                    }
                );
            }
        }).catch(err => {
            console.log(err);
        })
        .finally(() => {
            console.log();
            console.groupEnd();
        });
    }
}
