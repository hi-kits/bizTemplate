/**
 * 执行一次事件
 * @function once
 * @version 0.0.1
 * @author by fico on 2018/06/01
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 */
export function once(liveEvent): () => any {
    let RESULT;
    // tslint:disable-next-line: typedef
    return function() {
        if (liveEvent) {
            RESULT = liveEvent.apply(this, arguments);
            liveEvent = null;
        }
        return RESULT;
    };
}
