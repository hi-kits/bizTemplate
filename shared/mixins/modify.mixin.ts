/**
 * 编辑混入
 * @class ModifyMixin
 * @version 0.0.1
 * @author by fico on 2020/09/14
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
// 页面接口
import { AddEdit } from '@int/page';

export class ModifyMixin implements AddEdit {
    // ------------------ 构造函数 ------------------
    constructor(formBuilder) {
        this.FormBuilder = formBuilder;
    }
    // ------------------ 参数 ------------------
    /** 当前父对象 */
    _ParentItem;
    /** 当前对象 */
    _CurrentItem;
    /** 页面标题 */
    title: string;
    /** 视图类型
     * @ 1 新增
     * @ 2 编辑
     */
    type: any;
    /** 是否同步 - 修改后是否更新列表 */
    isSync = false;
    /* ---------- 表单 ---------- */
    /** @deprecated 此对象已废弃，请使用 modifyForm 代替. */
    addEditForm: any;
    /** 表单数据 */
    modifyForm: any;

    /** 表单数据组 */
    formList;
    /** loading 加载数据时状态 */
    isLoading: boolean;
    /** 表单生成器 */
    FormBuilder;

    // ------------------ 自定义函数 ------------------
    /** 创建表单元素 */
    createForm(): void {}

    /** 特殊处理 - 对数字为0时的处理
     * @def 默认的值
     * @value 加载时的动态参数
     * @return 处理后的结果
     */
    specialNumber(def, value): void {
        return typeof value === 'number' ? value : def;
    }
    /** 添加表单元素
     * @ name 需要添加的名称
     */
    addFormControl(name): any {
        return this.FormBuilder.control(name[0], name[1], name[2]);
    }
    /** 保存
     * @callback 点击保存时的回调
     */
    submitForm(callback): void {
        this.updateForm();
        callback();
    }
    /** 保存
     * @callback 更新form表单
     */
    updateForm(): void {
        const controls = this.modifyForm.controls;
        for (const key of Object.keys(controls)) {
            controls[key].markAsDirty();
            controls[key].updateValueAndValidity();
        }
    }


}
