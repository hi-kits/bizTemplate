/**
 * 函数节流
 * @class Throttle
 * @version 0.0.1
 * @author by fico on 2019/05/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export class Throttle {
    // 节流对象
    _THROTTlE = null;
    // 间隔时间
    _Time = 600;
    // 初始化
    init(callback: () => void, time?: number): void {
        if (this._THROTTlE !== null) {
            clearTimeout(this._THROTTlE);
        }
        this._THROTTlE = setTimeout(() => {
            callback();
        }, (time || this._Time));
    }

}
export const throttle = (callback: () => void, time?: number) => {
    const _Time = 600;
    let _THROTTlE;
    if (_THROTTlE !== null) {
        clearTimeout(_THROTTlE);
    }
    _THROTTlE = setTimeout(() => {
        callback();
    }, (time || _Time));
};



/**
 * 函数防抖 (完全版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * @param {boolean} immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (fn, delay, immediate = false) => {
  let timer = null;
  let status = true;
  if (!immediate) {
      // tslint:disable-next-line: typedef
      return function() {
          const args = arguments;
          if (timer) {
              clearTimeout(timer);
          }
          timer = setTimeout(() => fn.apply(this, args), delay);
      };
  // tslint:disable-next-line: typedef
  }
  return function() {
    clearTimeout(timer);
    if (status) {
      status = false;
      fn.call(this, arguments);
    }
    timer = setTimeout(() => status = true, delay);
  };
};
