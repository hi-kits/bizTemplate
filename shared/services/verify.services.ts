/**
 * 验证服务
 * @version 0.0.1
 * @author by fico on 2018/10/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 自定义验证器(其实就是一个函数,一个返回任意对象的函数)
 * 传递的参数是当前需要验证的表单的FormControl
 * 通过传递的参数获取当前表单输入的值
 */
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

// 提示文
const Remind = [
    '长度限制1000个字符',
    '请输入1-9位正整数'
];

interface LimitOptions {
    start: string;
    min: number;
    max: number;
    text: string;
    caseInsensitive?: boolean;
}
/**
 * 去除前后空格
 * @fn Trim
 * @param string value 字符串
 * @example
 * Trim(string)
 * @returns string 返回去除前后空格的字符串
 */
export function Trim(value: string): string {
    return String(value).replace(/(^\s*)|(\s*$)/g, '');
}

/* ------------------ 数字类型验证 ------------------*/
/**
 * 手机号码验证
 * @fn mobileVerify()
 * 验证手机号码是否正确
 * @param control form 输入数据.
 * ### Example
 * {@example name: [empty, [mobileVerify]]}
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function mobileVerify(control: FormControl): any {
    const REGEXP = /^(1[3|5|7|8|9]{1})+\d{9}$/;
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '手机号码格式不正确' } };
}
/**
 * 正整数 验证
 * @fn numberVerify
 * @example
 * name: [empty, [numberVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function numberVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = /^[1-9][0-9]{0,3}$/;
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '必须输入1-9999正整数' } };
}

/**
 * 数字 验证
 * @fn numVerify
 * @example
 * name: [empty, [numVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function numVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = /^[0-9]*$/;
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '必须输入数字' } };
}
/**
 * 固定位数数字 验证
 * @fn numberFixedVerify
 * @param  number  n - 最大长度
 * @param  string  text - 提示文本
 * @param  boolean  zero - 允不允许输入0
 * @example
 * name: [empty, [numberFixedVerify(40, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function numberFixedVerify(N: number, text: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp('^[0-9]{' + Number(N) + '}$', 'g'); // 允许
        const RESULT = REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: text } };
    };
}

/**
 * 当前时间几分钟后 - 异步验证
 * @fn timeVerify
 * @param  number  min - 最小间隔时间 以分钟
 * @param  string  text - 提示文本
 * @param  number  hour - 最小间隔时间 以小时
 * @example
 * name: [empty, [timeVerify(5, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function timeVerify(min?, text?, hour?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const date = +new Date();
        const value = +new Date(control.value);
        const TIME = value - date;
        if (min || min === 0) {
            const RESULT = TIME > min * 60 * 1000 ? true : false;
            return RESULT ? null : { ErrorValue: { info: text ? text : `定时时间只能设置在当前时间${min}分钟之后` } };

        }
        if (hour) {
            const RESULT = TIME > hour * 60 * 60 * 1000 ? true : false;
            return RESULT ? null : { ErrorValue: { info: text ? text : `申请时间只能设置在当前时间${hour}小时之后` } };

        }
    };
}

/**
 * 结束时间不能早于开始时间 - 异步验证
 * @fn timeEqualVerify
 * @example
 * name: [empty, [timeEqualVerify.bind(this)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function timeEqualVerify(control: FormControl): { [key: string]: any } {
    // return _Promise = new Promise (resolve => {
    if (control) {
        const begin = +new Date(control.value[0]);
        const end = +new Date(control.value[1]);
        return begin < end ? null : { ErrorValue: { info: `结束时间必须大于开始时间` } };
    }
    // });
}
/**
 * 开始时间必须大于当前时间 - 异步验证
 * @fn currentTimeEqualVerify
 * @example
 * name: [empty, [currentTimeEqualVerify.bind(this)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function currentTimeEqualVerify(control: FormControl): { [key: string]: any } {
    if (control) {
        const begin = +new Date(control.value[0]);
        const now = +new Date();
        return begin > now ? null : { ErrorValue: { info: `开始时间必须大于当前时间` } };
    }
}


/**
 * 正整数范围 验证
 * @fn numberRangeVerify
 * @param  number  max - 最大长度
 * @param  string  text - 提示文本
 * @param  boolean  zero - 允不允许输入0
 * @example
 * name: [empty, [numberRangeVerify(40, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function numberRangeVerify(max: number, text?, zero?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let REGEXP;
        if (zero === false) {
            REGEXP = new RegExp('^[0-9]{0,' + Number(max) + '}$', 'g'); // 允许
        } else {
            REGEXP = new RegExp('^[1-9][0-9]{0,' + (Number(max) - 1) + '}$', 'g');
        }
        const RESULT = REGEXP.test(control.value);
        if (typeof text === 'number') {
            text = Remind[text];
        }
        return RESULT ? null : { ErrorValue: { info: text ? text : zero === false ? `至少输入1-${max}正整数，允许输入0` : `至少输入1-${max}正整数，不允许输入0` } };
    };
}

/**
 * 安装包大小 验证
 * @fn sizeVerify
 * @example
 * name: [empty, [sizeVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function sizeVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = /^(([1-9][0-9]*\.[0-9][0-9]{0})|([0]\.[0-9][0-9]{0})|([1-9][0-9]*)|([0]{1}))$/;
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '必须为正整数或保留一位小数的正数' } };
}

/**
 * 1-10的数字验证
 * @fn numSizeVerify
 * @example
 * name: [empty, [numSizeVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function numSizeVerify(max: number, text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = /^([0-9]|10)$/;
        const RESULT = REGEXP.test(control.value);
        if (typeof text === 'number') {
            text = Remind[text];
        }
        return RESULT ? null : { ErrorValue: { info: text ? text : `至少输入1-${max}正整数，不允许输入0` } };
    };
}
/**
 * 金额验证
 * @fn priceVerify
 * @param  number  max - 最大长度
 * @param  string  text - 提示文本
 * @example
 * name: [empty, [priceVerify(6, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function priceVerify(max: number = 4, text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/(^[1-9]([0-9]{0,5})(\.[0-9]{1,2})?$)|(^[0-9]{1}(\.[0-9]{1,2})?$)/);
        const RESULT = REGEXP.test(control.value) && Number(control.value) > 0;
        return RESULT ? null : { ErrorValue: { info: text ? text : `请录入正确的金额` } };
    };
}
/**
 * 概率验证
 * @fn probabilityVerify
 * @param  number  max - 最大数
 * @param  string  text - 提示文本
 * @example
 * name: [empty, [priceVerify(6, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function probabilityVerify(max: number = 100, text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/(^[1-9]([0-9]{0,2})(\.[0-9]{1,5})?$)|(^[0-9]{1}(\.[0-9]{1,5})?$)/);
        const RESULT = REGEXP.test(control.value) && Number(control.value) > 0 && Number(control.value) <= max;
        return RESULT ? null : { ErrorValue: { info: text ? text : `请输入0.0001-100之间的数值(%)` } };
    };
}

/* ------------------ 字符串类型验证 ------------------*/
/**
 * 文本范围 验证
 * @fn rangeVerify
 * @param  number  min 最小长度
 * @param  number  max 最大长度
 * @param  string?  text 提示文本
 * @example
 * name: [empty, [rangeVerify(1, 20)]]
 * @example
 * 自定义提醒文本
 * name: [empty, [rangeVerify(1, 20, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function rangeVerify(min: number, max: number, text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // const REGEXP = new RegExp('^.{' + min + ',' + max + '}$', 'gm');
        // const RESULT = REGEXP.test(Trim(control.value));
        // 处理textarea 标签时，用正则校验回车符出错，改用字符长度校验
        const VALUE = Trim(control.value);
        const RESULT = VALUE.length >= min && VALUE.length <= max;
        if (typeof text === 'number') {
            text = Remind[text];
        }
        return RESULT ? null : { min, max, ErrorValue: { info: text ? text : `至少输入${min}-${max}位` } };
    };
}
/**
 * 以**开始并限制长度 验证
 * @fn limitVerify
 * @param  object  options 参数对象
 * @param  string  options.start 开始值 OMS or OMS|oms（不区分大小写）
 * @param  number  options.max 最大长度
 * @param  number  options.min 最小长度
 * @param  string  options.text 提示文本
 * @param  boolean?  options.caseInsensitive 不区分大小写
 * @example
 * name: [empty, [limitVerify({start: string, min: 5, max: 30, text: string})]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function limitVerify(options: LimitOptions): ValidatorFn {
    const START = options.start.split('|');
    const LENGTH = START[0].length;
    return (control: AbstractControl): { [key: string]: any } | null => {
        let VALUE = control.value.replace(/[\r\n\ +]/g, '');
        if (options.caseInsensitive) {
            options.start = options.start.toLowerCase();
            VALUE = VALUE.toLowerCase();
        }
        const REGEXP = new RegExp('^(' + options.start + ').{' + (options.min - LENGTH) + ',' + (options.max - LENGTH) + '}$');
        const RESULT = REGEXP.test(Trim(VALUE || control.value));
        return RESULT ? null : { min: options.min, max: options.max, ErrorValue: { info: options.text } };
    };
}
/**
 * 必填项为空 验证
 * @fn emptyVerify
 * @param  string?  text 定义name不允许为空
 * @param  boolean?  replace 自定义提醒文本
 * @example
 * name: [empty, [emptyVerify()]]
 * @example
 * 定义name不允许为空
 * name: [empty, [emptyVerify(name)]]
 * @example
 * 自定义提醒文本
 * name: [empty, [emptyVerify(string, true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function emptyVerify(text?: string, replace?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/(^\s*)|(\s*$)/g, '');
        let RESULT = REGEXP.test(control.value) && control.value !== null && control.value !== '';
        if (Array.isArray(control.value)) {
            RESULT = control.value.length > 0 ? true : false;
        }
        text = text || '';
        return RESULT ? null : { ErrorValue: { info: replace ? `${text}` : `${text}不允许为空` } };
    };
}
/**
 * 全选 验证
 * @fn allCheckVerify
 * @param  string?  text 定义name不允许为空
 * @param  Number?  text 定义一共有几个选项
 * @param  boolean?  replace 自定义提醒文本
 * @example
 * name: [empty, [allCheckVerify()]]
 * @example
 * 定义name不允许为空
 * name: [empty, [allCheckVerify(name)]]
 * @example
 * 自定义提醒文本
 * name: [empty, [allCheckVerify(string, true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function allCheckVerify(text?: string, len?: number, replace?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/(^\s*)|(\s*$)/g, '');
        let RESULT = REGEXP.test(control.value) && control.value !== null && control.value !== '';
        if (Array.isArray(control.value)) {
            RESULT = control.value.length > len - 1 ? true : false;
        }
        text = text || '';
        return RESULT ? null : { ErrorValue: { info: replace ? `${text}` : `请勾选全部${text}选项` } };
    };
}


/**
 * 不包含数字 验证
 * @fn noNumberVerify
 * @example
 * name: [empty, [noNumberVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
// export function noNumberVerify(control: FormControl): { [key: string]: any } | null {
//     const REGEXP = new RegExp(/\d+/);
//     const RESULT = !REGEXP.test(control.value);
//     return RESULT ? null : { ErrorValue: { info: '不能包含数字' } };
// }
export function noNumberVerify(text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/\d+/);
        let RESULT;
        if (control.value !== '') {
            RESULT = !REGEXP.test(Trim(control.value));
        } else {
            RESULT = true;
        }
        text = text || '';
        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}

/**
 * 长度限制 验证
 * @fn lengthVerify
 * @param  number?  max 最大长度
 * @param  number?  min 最小长度
 * @example
 * name: [empty, [lengthVerify()]]
 * @example
 * 设置最大位数
 * name: [empty, [lengthVerify(100)]]
 * @example
 * 设置最大和最小位数
 * name: [empty, [lengthVerify(100, 5)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function lengthVerify(max?: number, min?: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const MAX = max || 1000;
        const MIN = min || 1;
        const REGEXP = new RegExp('^.{' + Number(MIN) + ',' + Number(MAX) + '}$', 'g');
        const RESULT = REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: `长度限制${MAX}个字符` } };
    };
}

/**
 * 不允许输入中文 验证
 * @fn noChineseVerify
 * @param  string?  text 定义name不允许输入中文
 * @example
 * 默认值提醒
 * name: [empty, [noChineseVerify()]]
 * @example
 * 定义name不允许输入中文
 * name: [empty, [noChineseVerify(name)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function noChineseVerify(text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp(/^((?![\u4e00-\u9fa5]).)+$/);
        let RESULT;
        if (control.value !== '') {
            RESULT = REGEXP.test(Trim(control.value));
        } else {
            RESULT = true;
        }
        text = text || '';
        return RESULT ? null : { ErrorValue: { info: text + '不允许输入中文' } };
    };
}
/* ------------------ 组合类型验证 ------------------*/
/**
 * 由N位中文、英文、数字组成
 * @fn characterVerify
 * @param  string  text 错误提示文本
 * @param  number?  max 最大位数
 * @param  number?  min 最小位数
 * @example
 * name: [empty, [characterVerify(string)]]
 * @example
 * 设置最大位数
 * name: [empty, [characterVerify(string, 20)]]
 * @example
 * 设置最大和最小位数
 * name: [empty, [characterVerify(string, 20, 5)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function characterVerify(text: string, max?, min?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_]{' + (min || 1) + ',' + (max || 1000) + '}$');
        const RESULT = REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}
/**
 * 由N位英文、数字组成
 * @fn digitalEnVerify
 * @param  string  text 错误提示文本
 * @param  number?  max 最大位数
 * @param  number?  min 最小位数
 * @example
 * name: [empty, [digitalEnVerify(string)]]
 * @example
 * 设置最大位数
 * name: [empty, [digitalEnVerify(string, 20)]]
 * @example
 * 设置最大和最小位数
 * name: [empty, [digitalEnVerify(string, 20, 5)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function digitalEnVerify(text: string, max?, min?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp('^[A-Za-z0-9]{' + (min || 1) + ',' + (max || 1000) + '}$');
        const RESULT = REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}
/**
 * 版本号 验证
 * @fn versionVerify
 * @example
 * name: [empty, [versionVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function versionVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = new RegExp(/^\d{1,3}\.\d{1,3}\.\d{1,3}$/);
    let RESULT = REGEXP.test(control.value);
    if (RESULT) {
        const VALUE = control.value.split('.');
        RESULT = (Number(VALUE[0]) + Number(VALUE[1]) + Number(VALUE[2])) > 0 ? true : false;
    }
    return RESULT ? null : { ErrorValue: { info: '请输入XXX.XXX.XXX格式' } };
}
/**
 * 标识 由数字、字母、下划线组成的字符串 验证
 * @fn flagVerify
 * @param  string  text 错误提示文本
 * @param  number  max 最大位数
 * @param  number  min 最小位数
 * @example
 * 默认最大位数1000
 * name: [empty, [flagVerify(string)]]
 * @example
 * 修改最大位数200
 * name: [empty, [flagVerify(string, 200)]]
 * @example
 * 设置最大和最小位数
 * name: [empty, [flagVerify(string, 20, 5)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function flagVerify(text: string, max?, min?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp('^[0-9a-zA-Z_]{' + (min || 1) + ',' + (max || 1000) + '}$');
        const RESULT = REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}
/**
 * 输入指定位数字母及汉字验证
 * @fn flagVerify
 * @param  string  text 错误提示文本
 * @param  number  max 最大位数
 * @param  number  min 最小位数
 * @example
 * 设置字母最大位数
 * name: [empty, [wordVerify(string, 40)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function wordVerify(text: string, max?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const REGEXP = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_]{1,' + max + '}$');
        const RESULT1 = REGEXP.test(control.value);
        const RESULT2 = control.value.replace(/[^\x00-\xff]/g, 'aa').length <= max;
        const RESULT = RESULT1 && RESULT2;
        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}
/**
 * JSON 验证
 * @fn JSONVerify
 * @param  boolean  status 是否忽略必填验证
 * @example
 * 必填项验证
 * name: [empty, [JSONVerify()]]
 * @example
 * 非必填项验证
 * name: [empty, [JSONVerify(true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function JSONVerify(status?: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        try {
            const OBJECT = JSON.parse(control.value);
            RESULT = (typeof OBJECT === 'object' && OBJECT) ? true : false;
        } catch (e) {
            RESULT = false;
        }
        if (status && control.value === '') {
            RESULT = true;
        }
        return RESULT ? null : { ErrorValue: { info: '内容不满足JSON格式' } };
    };
}
/**
 * URL 验证
 * @fn urlVerify
 * @param  boolean  status 是否忽略必填验证
 * @example
 * 必填项验证
 * name: [empty, [urlVerify()]]
 * @example
 * 非必填项验证
 * name: [empty, [urlVerify(true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function urlVerify(status?: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        // const REGEXP = new RegExp('(http[s]{0,1})://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'i');
        // const REGEXP = new RegExp('/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i', 'i');
        const REGEXP = new RegExp('(http[s]{0,1})://', 'i');
        RESULT = (status && control.value === '') ? true : REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: 'http://或https://' } };
    };
}

/**
 * email 验证
 * @fn emailVerify
 * @example
 * name: [empty, [emailVerify]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function emailVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', 'i');
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '请填写正确的Email地址' } };
}

/* ------------------ 其他 ------------------*/
/**
 * 自定义 验证
 * @fn customVerify
 * @example
 * unRequired  是否非必填
 * reverse 是否是反向规则 为true时，匹配上正则则校验失败
 * name: [empty, [customVerify(RegExp, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function customVerify(reg: RegExp, text: string, unRequired?, reverse?): ValidatorFn {
    const verify = control => {
      const REGEXP = new RegExp(reg);
      if (reverse) {
        return !REGEXP.test(control.value);
      }

      return REGEXP.test(control.value);
    };

    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        if (unRequired) {
            if (!control.value) {
                RESULT = true;
            } else {
                RESULT = verify(control);
            }
        } else {
          RESULT = verify(control);
        }

        return RESULT ? null : { ErrorValue: { info: `${text}` } };
    };
}
/**
 * 颜色色值 验证
 * @fn colorVerify
 * @example
 * name: [empty, [colorVerify(RegExp, string)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function colorVerify(control: FormControl): { [key: string]: any } | null {
    const REGEXP = new RegExp('^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$');
    const RESULT = REGEXP.test(control.value);
    return RESULT ? null : { ErrorValue: { info: '请填写正确的颜色色值' } };

}

/**
 * 时间段跨度不允许超过30天 - 异步验证
 * @fn timeMonthVerify
 * @example
 * name: [empty, [timeMonthVerify.bind(this)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function timeMonthVerify(day, text?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control) {
            const date = +new Date(control.value[0]);
            const value = +new Date(control.value[1]);
            const TIME = (value - date) / (1000 * 60 * 60 * 24);
            // const TIME = (value - date);
            const RESULT = TIME > day ? true : false;
            return RESULT ? { ErrorValue: { info: text ? text : `搜索时间段跨度不允许超过${day}天` } } : null;
        }
    };
}

/**
 * 验证是否包含某个字符一次或多次
 * @fn urlVerify
 * @param  text  string 筛选的字符
 * @param  status  boolean 是否做验证
 * @example
 * 必填项验证
 * name: [empty, [urlVerify()]]
 * @example
 * 非必填项验证
 * name: [empty, [urlVerify(true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function isCharacterVerify(text, status, info): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        const REGEXP = new RegExp(`${text}+`, 'i');
        RESULT = (!status && control.value !== '') ? true : REGEXP.test(control.value);
        return RESULT ? null : { ErrorValue: { info: info ? info : `输入内容必须包括${text}` } };
    };
}

/**
 * 验证输入内容的个数，1，2，3，=》 输入了3个
 * @fn urlVerify
 * @param  size  string 筛选的字符
 * @param  status  boolean 是否做验证
 * @example
 * 必填项验证
 * name: [empty, [urlVerify()]]
 * @example
 * 非必填项验证
 * name: [empty, [urlVerify(true)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */
export function quantityVerify(size, info?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        let valueArr = [];
        if (control.value !== '') {
            valueArr = control.value.split(',');
            valueArr = valueArr.filter(e => e);
            valueArr = valueArr.filter(e => e.replace(/(\r\n|\n|\r)/gm, ''));
            RESULT = valueArr.length > size;
        }
        return !RESULT ? null : { ErrorValue: { info: info ? info : `最多只能输入${size}个` } };
    };
}


/**
 * 结束时间不能晚于开始时间后多少天- 异步验证
 * @fn limit 开始时间
 * @   last  开始时间后多少天
 * name: [empty, [timeEqualVerify.bind(this)]]
 * @returns null | { [key: string]: any }  验证通过返回null, 反之返回错误信息对象
 */

export function endTimeVerify(limit, last, info?): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let RESULT;
        const deadlineDate = moment(new Date(moment(limit).format()).getTime() + last * 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
        if (control) {
            const end = +new Date(control.value[1]);
            console.log(limit, end);
            const deadline = new Date(moment(limit).format()).getTime() + last * 24 * 60 * 60 * 1000;
            RESULT = deadline > end;
        }
        return RESULT ? null : { ErrorValue: { info: info ? info : `结束日期需在${deadlineDate}前` } };
    };
}
