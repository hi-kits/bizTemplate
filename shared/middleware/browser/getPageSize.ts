/**
 * 页面位置及窗口大小
 * @function getPageSize
 * @version 0.0.1
 * @author by fico on 2018/10/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @example getPageSize()
 * @return {Array} 页面宽度 PageW,页面高度 PageH,窗口宽度 WinW,窗口高度 WinH
 */

export function getPageSize(): {
    PageW: any;
    PageH: any;
    WinW: any;
    WinH: any;
} {
    let SCROLL_WIDTH: any;
    let SCROLL_HEIGHT: any;
    // tslint:disable-next-line: no-string-literal
    if (window.innerHeight && window['scrollMaxY']) {
        // Mozilla
        // tslint:disable-next-line: no-string-literal
        SCROLL_WIDTH = window.innerWidth + window['scrollMaxX']; SCROLL_HEIGHT = window.innerHeight + window['scrollMaxY'];
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        // all but IE Mac
        SCROLL_WIDTH = document.body.scrollWidth; SCROLL_HEIGHT = document.body.scrollHeight;
    } else if (document.body) {
        // IE Mac
        SCROLL_WIDTH = document.body.offsetWidth; SCROLL_HEIGHT = document.body.offsetHeight;
    }
    let WINDOW_WIDTH: any;
    let WINDOW_HEIGHT: any;
    if (window.innerHeight) {
        // all except IE
        WINDOW_WIDTH = window.innerWidth; WINDOW_HEIGHT = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        // IE 6 Strict Mode
        WINDOW_WIDTH = document.documentElement.clientWidth; WINDOW_HEIGHT = document.documentElement.clientHeight;
    } else if (document.body) {
        // other
        WINDOW_WIDTH = document.body.clientWidth; WINDOW_HEIGHT = document.body.clientHeight;
    }
    // 页面小于窗口,设置和窗口相等
    const PAGE_WIDTH = (SCROLL_WIDTH < WINDOW_WIDTH) ? WINDOW_WIDTH : SCROLL_WIDTH;
    const PAGE_HEIGHT = (SCROLL_HEIGHT < WINDOW_HEIGHT) ? WINDOW_HEIGHT : SCROLL_HEIGHT;
    return { PageW: PAGE_WIDTH, PageH: PAGE_HEIGHT, WinW: WINDOW_WIDTH, WinH: WINDOW_HEIGHT };
}
