/**
 * 搜索页面
 * @class: APPLookupComponent
 * @version 0.0.2
 * @author by fico on 2018/09/12
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2020/09/12 0.0.2 新增mixin混入方式
 */

import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 查询页面函数混入
import { LookupMixin } from '@shared/mixins/lookup.mixin';

// 项目参数
import { AppParameter } from '../../app.parameter';

@Component({
  selector: 'app-lookup',
  templateUrl: './app.lookup.component.html',
})

export class APPLookupComponent extends LookupMixin {
  // ------------------ 构造函数 ------------------
  constructor(
    private formBuilder: FormBuilder,
    private appParameter: AppParameter,
  ) {
    super();
    this.createForm();
  }

  // ------------------ 参数 ------------------
  @Input() searchInfo;
  @Output() searchSubmitChange: EventEmitter<number> = new EventEmitter();
  // 父组件中获得子组件的引用
  @ViewChild('DatePicker', {static: false}) datePicker;

  // 页面
  pageTypeList = this.appParameter.option.pageType;
    /* ---------- 日期基本属性 ---------- */
  // 日历控件禁用状态
  nzDisabledStatus = false;
  rangeDates;

  // 时间发生变化的回调
  change(choice): void {
    this.SearchForm.patchValue({
      rangeDate: choice,
    });
  }
  // ------------------ 自定义函数 ------------------
  /** 对查询结果进行重置 */
  reset(): void {
    super.reset(() => {
      this.datePicker.value = null;
    });
  }
  // 创建表单元素
  createForm(): void {
    this.SearchForm = this.formBuilder.group({
      // 页面 0 页面 1 底TAB
      pageType: [''],
      // 模板名称
      mouldName: [''],
      // 提审人
      submitBy: [''],
      // 提审时间
      rangeDate: ['']
    });
  }


}
