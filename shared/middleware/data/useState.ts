/**
 * useState
 * @class useState
 * @version 0.0.1
 * @author by fico on 2019/07/22
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export function useState<S>(initialState: S): [S, (prevState: S) => S] {
    return [initialState, (prevState) => {
        return initialState = prevState;
    }];
}
