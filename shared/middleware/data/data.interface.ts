/**
 * 数据接口
 * @class DataOM
 * @version 0.0.1
 * @author by fico on 2018/05/31
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description:
 */
import { once, IsEqual } from '@mid/common';

// 配置文件
export interface Config {
    // 自动更新
    autoUpdate?: boolean;
    // 间隔时间
    space?: number;
    // 数据
    name?: any;
    // 初始化
    init(callback: (n, d) => void): void;
}

export class DataOM {
    // 数据
    data: object = {};
    // 名称
    name: any;
    // tslint:disable-next-line: only-arrow-functions typedef
    private subscribeCallback: (n, d) => void = function() {};
    constructor(
    ) {}
    subscribe(callback: (name: string, data: any) => void ): void {
        this.subscribeCallback = callback;
    }

    // 配置文件
    config(options: Config): void {
        const that = this;
        that.name = options.name;
        // 初始化执行方法
        // tslint:disable-next-line: only-arrow-functions typedef
        const _Init_ = function() {
            options.init((name, data) => {
                // 赋值
                if ( !IsEqual.prototype.get(that.data[name], data) ) {
                    that.data[name] = data;
                    that.subscribeCallback(name, that.data[name]);
                }
            });
        };
        once(_Init_());
        // 自动同步
        if (options.autoUpdate) {
            setInterval(_Init_, options.space || (10000 * 60 * 1));
        }
    }
}
