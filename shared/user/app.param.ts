/**
 * APP参数
 * @ AppParam
 * @version 0.0.7
 * @author by fico on 2018/02/09
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 *      APP 所需的参数类型的定义和初始化
 */
export class AppParam {
    // [x: string]: any;
    /** 页面标题 */
    title: string;
    /** 是否是测试模式 */
    isTestParam: boolean;
    /** 请求头对象 */
    headers = {
        pageId: '',
        accessToken: '',
        clientId: ''
    };
}
