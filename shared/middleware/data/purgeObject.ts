/**
 * Purge 净化对象内指定的key
 * @fn Purge
 * @version 0.0.1
 * @author by fico on 2019/09/11
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2021/6/5 增加多个删除条件， value 变更为数组
 * 2021/6/5 增加多层循环调用
 */

export function Purge(Obj: object, value: string | any[]): object {
    if (Object.prototype.toString.call(value) === '[object String]') {
        // tslint:disable-next-line:no-parameter-reassignment
        value = [value];
    }
    // tslint:disable-next-line: forin
    for (const key in Obj) {
        if (Obj.hasOwnProperty(key)) {
            if (value.includes(Obj[key])) {
                delete Obj[key];
            }
        }
        if (Object.prototype.toString.call(Obj[key]) === '[object Object]') {
            Purge(Obj[key], value);
        }
    }
    return Obj;
}

