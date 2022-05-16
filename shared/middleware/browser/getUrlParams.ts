/**
 * 获取URL参数
 * @function getUrlParams
 * @version 0.0.1
 * @author by fico on 2018/02/11
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @example getUrlParams()
 * @param { string } options.url 需要处理的url
 * @param { Array<Any> } options.type 指定获取某个参数
 * @return {}
 * @type Object
 * @description
 *      获取URL参数方法 返回结果为JSON对象
 *      可以对 ?a=1&b=2 参数进行解析 {'a':'1','b':'2'}
 *      可以对复杂的url参数进行解析 ?c=3#/?a=1&b=2 参数进行解析 {'a':'1','b':'2','c':'3'}
 *      可以对入参的 url 进行解析 {'url':'http://***.com/?c=3#/?a=1&b=2'}
 *      可以指定获取某个参数 {type:['url=','url']} 例如：http://***.com/?c=3#/?url=1&b=2 返回的结果 {'url':'1&b=2'}
 */

interface OptionsValue {
    url?: string;
    type?: any[];
}

export function getUrlParams(options?: OptionsValue): {} {
    // tslint:disable-next-line:no-parameter-reassignment
    options = options || {};
    const RESULT_DATA = {};
    const LINK_URL = options.url ? options.url : window.location.href;
    const MARK = LINK_URL.indexOf('?') + 1;
    let URL_DATA = LINK_URL.substring(MARK);
    if (MARK !== 0) {
        if (!!options.type) {
            const TYPE_DATA = URL_DATA.indexOf(options.type[0]) + options.type[0].length;
            RESULT_DATA[options.type[1]] = URL_DATA.substring(TYPE_DATA);
        } else {
            // angular #/ 多问号 特殊处理
            URL_DATA = URL_DATA.replace(/%26/gi, '&').
            replace(/%2F/gi, '/').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+').
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%3B/gi, ';').
            replace(/%20/g, ' ').
            replace(/\?/g, '&').
            replace(/\#\//g, '&').
            replace(/\&&/g, '&');
            // 获取参数的值
            const DATA = URL_DATA.split('&');
            for (const value of DATA) {
                const ARRAY = value.split('=');
                RESULT_DATA[ARRAY[0]] = ARRAY[1];
            }
        }
    }
    return RESULT_DATA;
}
