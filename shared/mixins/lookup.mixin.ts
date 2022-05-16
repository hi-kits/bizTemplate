/**
 * 查询混入
 * @class LookupMixin
 * @version 0.0.1
 * @author by fico on 2020/09/14
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
// 页面接口
import { Lookup } from '@int/page';

export class LookupMixin implements Lookup {
    // ------------------ 构造函数 ------------------
    constructor() {}
    // ------------------ 参数 ------------------
    /** 查询数据 */
    SearchForm: any;
    /** 查找信息 */
    searchInfo: boolean;
    /** 查找时的回调 */
    searchSubmitChange: any;
    /** 日历控件禁用状态 */
    nzDisabledStatus?: boolean;

    // nzDisabledStatusOther?: boolean;
    /** 时间范围 */
    rangeDates?: any;
    // ------------------ 自定义函数 ------------------
    /** 时间发生变化的回调
     * @choice 当前时间
     * @type 当前时间类型
     */
    change?(choice: any, type?): void;
    /** 点击确定按钮的回调 */
    onOk?(): void;

    /** 对查询结果进行重置 */
    reset(callback?: () => void): void {
        this.createForm();
        if (callback) {
            callback();
        }
        this.searchInfo = {...this.SearchForm.value};
        this.searchSubmitChange.emit();
    }

    /** 创建表单元素 */
    createForm(): void {}
    // 保存
    /** 提交表单函数 */
    submit(callback?: () => void): void {
        /**
         * valid:是否有效
         * invalid:无效
         * dirty:脏
         * status:状态
         * errors:显示错误
         */
        if (this.SearchForm.valid) {
            this.searchInfo = {...this.SearchForm.value};
            if (callback) {
                callback();
            } else {
                this.searchSubmitChange.emit();
            }
        }
    }

}
