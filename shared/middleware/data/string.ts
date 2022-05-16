/**
 * 对象转换
 * @fn stringify
 * @version 0.0.1
 * @author by fico on 2019/11/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function stringify(obj: object): string {
    return obj ? Object.keys(obj).sort().map((key) => {
        let val = obj[key];
        if (val === undefined || val === null) {
            val =  '';
        }
        if (Array.isArray(val)) {
            val = val.join(',');
        }
        return key + '=' + val;
    }).filter((x) => {
        return x.length > 0;
    }).join('&') : '';
}
