/**
 * 背景图模块数据混入
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
import { Message } from '@shared/modulesOptional/message/app.message';
// 服务
import { HttpServices } from '@shared/services';

type GetName = 'ArticleQuery' | 'ShoppingQuery';

@Injectable()
export class ViewAction {
    // 请求参数
    param: object;
    constructor(
        private message: Message,
        private httpServices: HttpServices,
    ) {}

    // 请求
    private httpSend(options: HttpOption): Promise<any> {
        return this.httpServices.HTTP(options, (ResultData) => {
        }, (error) => {
            if (error.name !== 'msgTest') {
                this.message.warning(error.result.message !== '' ? error.result.message : '数据错误！');
            }
        });
    }

    /** 获取数据 */
    get(name: GetName, options?: any, callback?: (r) => void, error?: () => void): Promise<any> {
        const HTTP_BODY = {...options}; // 请求数据
        let URL = ''; // 请求url
        const TYPE = null; // 请求类型
        let PARAM_URL = ''; // 参数url
        let METHOD = 'POST'; // 请求方式
        const IS_IGNORE = false; // 是否忽略返回结果
        // 判断参数类型
        if (typeof options === 'function') {
            // tslint:disable-next-line:no-parameter-reassignment
            callback = arguments[1];
            // tslint:disable-next-line:no-parameter-reassignment
            error = arguments[2];
            // options = undefined;
        }
        switch (name) {
           // 图文导航组件-文章查询
            case 'ArticleQuery':
                METHOD = 'POST';
                PARAM_URL = 'plugins/article/getArticleList';
                break;
           // 图文导航组件-商品查询
            case 'ShoppingQuery':
                METHOD = 'POST';
                PARAM_URL = 'plugins/sku/getProductList';
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
            isIgnore: IS_IGNORE
        });
    }

}
