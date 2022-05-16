/**
 * 获取字典
 * @export
 * @version 0.0.1
 * @author by fico on 2021/05/28
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

// 类型接口
import { HttpOption } from '@int/types';
// 消息
// import { Message } from '@shared/modulesOptional/message/app.message';
// 服务
import { HttpServices } from '@shared/services';


@Injectable({
    providedIn: 'root',
})
export class DictionaryAction {
    // 请求参数
    param: object;
    constructor(
        // private message: Message,
        private httpServices: HttpServices,
    ) { }

    // 请求
    private httpSend(options: HttpOption): Promise<any> {
        return this.httpServices.HTTP(options, (ResultData) => {
        }, (error) => {
            if (error.name !== 'msgTest') {
                console.log (error.result.message !== '' ? error.result.message : '数据错误！');
            }
        });
    }
    /** 获取数据 */
    getDic(options?: any, callback?: (r) => void, error?: () => void): Promise<any> {
        let httpBody;
        let paramURL; // 参数url
        const IS_IGNORE = false; // 是否忽略返回结果
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
        } else {
            httpBody = { dictCode: options.type };
            paramURL = 'plugins/dict/data/loadDict';
        }

        const URL = environment.paths.SERVER_URL + paramURL;
        return this.httpSend({
            name: options.type,
            method: 'GET',
            url: URL,
            paramUrl: paramURL,
            httpBody,
            callback: callback || (() => { }),
            error: error || (() => { }),
            isIgnore: IS_IGNORE
        });
    }

}
