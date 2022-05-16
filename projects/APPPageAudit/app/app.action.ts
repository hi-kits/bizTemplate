/**
 * 请求
 * @class: ViewAction
 * @version: 0.0.1
 * @date: 2018/07/19
 * @author: fico
 * @description:
 * 对外提供 get 和 set 异步方法
 * 通过调用签名方法获取签名参数
 */
import { Injectable } from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 类型接口
import { HttpOption } from '@int/types';
// 消息
import { Message } from '@shared/modulesOptional/message/app.message';

export type GetName = 'listQuery' | 'thumbnailUrl';
export type SetName = 'start' | 'audit';

@Injectable()
export class ViewAction {
    constructor(
        private message: Message,
        private httpServices: HttpServices,
    ) {}

    // 请求
    private httpSend(options: HttpOption): Promise<any> {
        return this.httpServices.HTTP(options, (ResultData) => {
            if (ResultData.name.indexOf('Delete') > -1) {
                this.message.success('删除成功！');
            }
        }, (error) => {
            this.message.warning(error.result.message);
        });
    }

    // 获取数据
    get(name: GetName, options?: any, callback?: (r) => void, error?: (r) => void): Promise<any> {
        let HTTP_BODY = {...options}; // 请求数据
        let URL = ''; // 请求url
        const TYPE = null; // 请求类型
        let PARAM_URL = ''; // 参数url
        const METHOD = 'GET'; // 请求方式
        const isIgnore = false; // 是否忽略返回结果
        // 判断参数类型
        if (typeof options === 'function') {
            // tslint:disable-next-line:no-parameter-reassignment
            callback = arguments[1];
            // tslint:disable-next-line:no-parameter-reassignment
            error = arguments[2];
            // tslint:disable-next-line:no-parameter-reassignment
            options = undefined;
        }
        switch (name) {
            // 列表
            case 'listQuery':
                HTTP_BODY = {
                    pageNo: options.index,
                    pageSize: options.pageSize,
                    ...options.searchObj
                };
                PARAM_URL = 'shm/reslocal/visualize/review/list';
                break;
            // 列表
            case 'thumbnailUrl':
                PARAM_URL = 'shm/reslocal/visualize/review/getMouldThumbnailUrl';
                break;
            default:
                return null;
        }
        URL = environment.paths.SERVER_URL + PARAM_URL;
        return this.httpSend({
            name,
            type: TYPE,
            method: METHOD,
            url: URL,
            paramUrl: PARAM_URL,
            httpBody: HTTP_BODY,
            callback: callback || (() => {}),
            error: error || (() => {}),
            isIgnore
        });
    }

    // 提交数据
    set(name: SetName, options: any, callback?: (r) => void, error?: (r) => void): Promise<any> {
        const HTTP_BODY = {...options}; // 请求数据
        let URL = ''; // 请求url
        let PARAM_URL = ''; // 参数url
        const METHOD = 'POST'; // 请求方式
        const isIgnore = true; // 是否忽略返回结果
        switch (name) {
            // 审核开始
            case 'start':
                PARAM_URL = 'shm/reslocal/visualize/review/start';
                break;
            // 审核提交
            case 'audit':
                PARAM_URL = 'shm/reslocal/visualize/review/end';
                break;
            default:
                return null;
        }
        URL = environment.paths.SERVER_URL + PARAM_URL;
        return this.httpSend({
            name,
            method: METHOD,
            url: URL,
            paramUrl: PARAM_URL,
            httpBody: HTTP_BODY,
            callback: callback || (() => {}),
            error: error || (() => {}),
            isIgnore
        });
    }


}
