/**
 * 版本对比
 * @function IsVerEqual
 * @version 0.0.1
 * @author by fico on 2018/06/06
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export class IsVerEqual {
    // 版本转换
    private toNum(version: string): string{
        const VERSION = version.toString();
        const VERSION_ARRAY = VERSION.split('.');
        const NUM_PLACE = ['0000', '000', '00', '0', ''];
        VERSION_ARRAY.forEach((itme, index) => {
            const LENGTH = itme.length;
            VERSION_ARRAY[index] = NUM_PLACE[LENGTH] + String(itme);
        });
        const RES = VERSION_ARRAY.join('');
        return RES;
    }
    // 比对版本
    version(versionA, versionB): boolean {
        return this.toNum(versionA) <= this.toNum(versionB);
    }
}

