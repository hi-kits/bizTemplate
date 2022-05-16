/**
 * trim 删除字符串前后空格
 * @function Trim
 * @version 0.0.1
 * @author by fico on 2019/06/14
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export function Trim(Obj): any {
    // 判断字符串
    if (typeof(Obj) === 'string') {
        return String(Obj).replace(/(^\s*)|(\s*$)/g, '').replace(/\u200B/g, '');
    }
    // 判断数组
    if (Object.prototype.toString.call(Obj) === '[object Array]'){
        Obj.forEach(element => {
            element = Trim(element);
        });
        return Obj;
    }
    // 判断不是对象
    // 不知道obj 这里需要弱类型判断，所以做规则忽略，以后还是使用 ===
    // tslint:disable-next-line:triple-equals
    if (Object.prototype.toString.call(Obj) !== '[object Object]' || Obj == null) {
        return Obj;
    }
    // 对象处理
    // tslint:disable-next-line: forin
    for (const name in Obj) {
        Obj[name] = Trim(Obj[name]);
    }
    return Obj;

}
/**
 * trim 去除字符串内所有的空格
 * @function TrimSpaces
 * @version 0.0.1
 * @author by fico on 2019/09/11
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function TrimSpaces(str: object, key: string): any {
    if (typeof str[key] !== 'undefined') {
        return  str[key] = str[key].replace(/\s*/g, '');
    }
}
