/**
 * 对象对比
 * @function IsEqual
 * @version 0.0.2
 * @author by fico on 2018/06/01
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2018/06/05 更改对比方法
 */
import { isFunction } from '@mid/common/extend/isFunction';

export class IsEqual {
    // 深度对比
    private deepEqual(objA, objB, aStack?, bStack?): boolean {
        // a 和 b 的内部属性 [[class]] 相同时 返回 true
        const CLASS_NAME = toString.call(objA);
        if (CLASS_NAME !== toString.call(objB)) {
            return false;
        }
        switch (CLASS_NAME) {
            case '[object RegExp]':
            case '[object String]':
                return '' + objA === '' + objB;
            case '[object Number]':
                if (+objA !== +objA) {
                    return +objB !== +objB;
                }
                return +objA === 0 ? 1 / +objA === 1 / objB : +objA === +objB;
            case '[object Date]':
            case '[object Boolean]':
                return +objA === +objB;
        }

        const IS_ARRAYS = CLASS_NAME === '[object Array]';
        // 不是数组
        if (!IS_ARRAYS) {
            // 过滤掉两个函数的情况
            if (typeof objA !== 'object' || typeof objB !== 'object') {
                return false;
            }
            // tslint:disable-next-line: one-variable-per-declaration
            const aCtor = objA.constructor, bCtor = objB.constructor;
            // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
            if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in objA && 'constructor' in objB)) {
                return false;
            }
        }

        aStack = aStack || [];
        bStack = bStack || [];
        let length = aStack.length;

        // 检查是否有循环引用的部分
        while (length--) {
            if (aStack[length] === objA) {
                return bStack[length] === objB;
            }
        }

        aStack.push(objA);
        bStack.push(objB);

        // 数组判断
        if (IS_ARRAYS) {

            length = objA.length;
            if (length !== objB.length) {
                return false;
            }
            while (length--) {
                if (!this.get(objA[length], objB[length], aStack, bStack)) {
                    return false;
                }
            }
        } else {
            // 对象判断
            let key;
            const keys = Object.keys(objA);
            length = keys.length;

            if (Object.keys(objB).length !== length) {
                return false;
            }
            while (length--) {
                key = keys[length];
                if (!(objB.hasOwnProperty(key) && this.get(objA[key], objB[key], aStack, bStack))) {
                    return false;
                }
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }

    get(objA, objB, aStack?, bStack?): boolean {
        // === 结果为 true 的区别出 +0 和 -0
        if (objA === objB) {
            return objA !== 0 || 1 / objA === 1 / objB;
        }
        // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
        if (objA == null || objB == null) {
            return false;
        }
        // 判断 NaN
        if (objA !== objA) {
            return objB !== objB;
        }
        // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
        const type = typeof objA;
        if (type !== 'function' && type !== 'object' && typeof objB !== 'object') {
            return false;
        }
        // 更复杂的对象使用 deepEq 函数进行深度比较
        return this.deepEqual(objA, objB, aStack, bStack);
    }
}
