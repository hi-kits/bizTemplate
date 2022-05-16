/**
 * 创建数组索引
 * @fn ArrayIndex
 * @version 0.0.1
 * @author by fico on 2019/08/12
 * @param object options 选项
 * @param array options.array 需要处理的数组
 * @param array options.indexs 创建索引的数组对象
 * @param function options.logic 逻辑运算
 * @example
 * ArrayIndex({array: obj, indexs: {key: string, value: string}})
 * @example
 * ArrayIndex({array: obj, logic: (previousValue, currentValue, index, array) => {}})
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
 * currentValue （数组中当前被处理的元素）
 * index （当前元素在数组中的索引）
 * array （调用 reduce 的数组）
 */
interface Options {
    /**
     * 需要解析的源数组
     */
    array: any[];
    /**
     * 需要处理的索引对象
     * @param key string 生成索引的key
     * @param value string（单个） | Array<string>（多个） | null（全部） 生成索引的value
     */
    indexs?: Ind;
    /**
     * 逻辑运算
     * @param previousValue 上一次调用回调返回的值
     * @param currentValue 数组中当前被处理的元素
     * @param index 当前元素在数组中的索引
     * @param array 调用 reduce 的数组
     */
    logic?(previousValue, currentValue, index, array): void;
}

interface Ind {
    [x: string]: any;
    [index: number]: {
        key: string;
        value?: string | string[] | null;
    };
}
type Result =  { INDEX: any } & [];

export function ArrayIndex<T extends Result>(options: Options): T {
    // 对数组长度为0 的处理
    if (options.array.length === 0) {
        const Array = [null];
        return Array.reduce( (previousValue) => {
            previousValue.INDEX = {};
            return previousValue;
        }, []);
    }
    // 正常处理
    return options.array.reduce( (previousValue, currentValue, index, array) => {
        // 创建INDEX对象
        previousValue.INDEX = previousValue.INDEX || {};
        if (options.indexs) {
            const Indexs = options.indexs;
            const Indexlength = options.indexs.length;
            for (let i = 0; i < Indexlength; i ++) {
                const currentItem = Indexs[i];
                const CurrentKey = currentItem.key ? currentValue[currentItem.key] : currentValue;
                let CurrentVal;
                if (typeof currentItem.value === 'undefined' || currentItem.value === null) {
                    CurrentVal = currentValue;
                } else if (typeof currentItem.value === 'object') {
                    CurrentVal = {};
                    currentItem.value.forEach( (element) => {
                        CurrentVal[element] = currentValue[element];
                    });
                } else {
                    CurrentVal = currentValue[currentItem.value];
                }
                if (Indexlength > 1) {
                    previousValue.INDEX[currentItem.key] = previousValue.INDEX[currentItem.key] || {};
                    previousValue.INDEX[currentItem.key][CurrentKey] = CurrentVal;
                } else {
                    previousValue.INDEX[CurrentKey] = currentItem.key ? CurrentVal : index;
                }
            }
            previousValue.push(currentValue);
        }
        if (options.logic) {
            options.logic(previousValue, currentValue, index, array);
        }
        return previousValue;
    }, []);
}


