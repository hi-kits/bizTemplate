/**
 * 混入
 * @function applyMixins
 * @version 0.0.1
 * @author by fico on 2020/09/10
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]): void {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
