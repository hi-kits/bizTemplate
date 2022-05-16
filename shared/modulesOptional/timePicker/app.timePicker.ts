/**
 * 时间控件组件
 * @class AppTimePickerComponent
 * @version 0.0.1
 * @author by fico on 2020/08/05 16:50
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
// 日期格式化
import { DateServices } from '@shared/services/date.services';


@Component({
  selector: 'app-time-picker',
  templateUrl: './app.timePicker.html',
})

export class AppTimePickerComponent {
  /* ---------- 基本属性 ---------- */
  // 展示的时间格式
  @Input() nzFormat = 'HH:mm:ss';
  // 时间
  @Input() value = new Date();


  /* ---------- 扩展属性 ---------- */
  // 是否显示清除按钮
  @Input() nzAllowEmpty = true;

  /* ---------- 回调事件 ---------- */
  // 时间发生变化的回调
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();


  // 时间发生变化的回调
  change(choice): boolean {
    this.ngModelChange.emit(DateServices(choice, this.nzFormat));
    return false;
  }

}
