/**
 * 滚动条位置
 * @function getPageScroll
 * @version 0.0.1
 * @author by fico on 2018/10/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @example getPageScroll()
 * @return {Array} 滚动条 X,滚动条 Y
 */

export function getPageScroll(): {
    X: any;
    Y: any;
} {
    let x: any;
    let y: any;
    if (window.pageYOffset) {
        // 除了IE
        y = window.pageYOffset; x = window.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        // IE 6严格
        y = document.documentElement.scrollTop; x = document.documentElement.scrollLeft;
    } else if (document.body) {
        // 所有其他的IE
        y = document.body.scrollTop; x = document.body.scrollLeft;
    }
    return { X: x, Y: y };
}
