/**
 * 是否是数组
 * @function isArray
 * @version 0.0.1
 * @author by fico on 2018/09/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 */

const isArray =
    Array.isArray ||
    // tslint:disable-next-line: only-arrow-functions
    function(arg): boolean {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
export default isArray;
