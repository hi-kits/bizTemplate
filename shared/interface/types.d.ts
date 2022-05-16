// 定义返回数据接口
export interface ResponseResult {
    /**
     * 请求返回数据
     */
    data: any;
    /**
     * 请求返回code
     */
    retCode: string;
    /**
     * 请求返回信息
     */
    retInfo: string;
}
type HttpOptionType = 'upload' | 'export' | 'noLimit' | 'jsonp' | 'exportWithXToken';
// http选项
export interface HttpOption {
    /**
     * 接口名称
     */
    name: string;
    /**
     * 接口访问类型
     */
    method?: string;
    /**
     * 请求头对象
     */
    headers?: object;
    /**
     * 请求URL
     */
    url: string;
    /**
     * 请求类型
     * @ upload 上传的类型
     * @ export 导出时的类型
     * @ noLimit 无限制 - 对请求接口不做拦截处理
     * @ jsonp jsonp请求接口跨越
     */
    type?: HttpOptionType;
    /**
     * 接口URL
     */
    paramUrl: string;
    /**
     * 请求数据
     */
    httpBody: any;
    /**
     * 是否忽略返回结果
     */
    isIgnore: boolean;
    /**
     * 成功回调
     * @r 成功后返回的结果
     */
    callback(r): void;
    /**
     * 失败回调
     *
     */
    error(r?): void;
    /**
     * 请求拦截器回调
     * 特殊化处理请求信息
     */
    interceptorCallback?: (r, h)=> {};
}

/**
 * 定义返回数据接口
 */
export interface HandleOption {
    /**
     * 数据类型 'success' | 'error'
     * @ success 成功
     * @ error 失败
     */
    type: 'success' | 'error';
    /**
     * 接口名称
     */
    name: string;
    /**
     * 返回结果数据
     */
    result: any;
    data?: any;
    /**
     * 成功回调
     * @r 成功后返回的结果
     */
    callback(r): void;
    /**
     * 失败回调
     * @r 失败后返回的结果
     */
    error(r): void;
    /**
     * 是否忽略返回结果
     */
    isIgnore?: boolean;
}
