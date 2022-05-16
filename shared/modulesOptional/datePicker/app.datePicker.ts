/**
 * 日期控件组件
 * @class AppDatePickerComponent
 * @version 0.0.1
 * @author by fico on 2018/12/03
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleOptionalParameter } from '@shared/modulesOptional/app.modulesOptional.parameter';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';

import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
// 日期格式化
import { DateServices } from '@shared/services/date.services';

// tslint:disable-next-line: new-parens
const appModuleOptionalParameter = new AppModuleOptionalParameter;

@Component({
  selector: 'app-date-picker',
  templateUrl: './app.datePicker.html',
  styleUrls: ['./app.datePicker.css'],
  styles: [`nz-date-picker, nz-month-picker, nz-range-picker, nz-week-picker {margin: 0 8px 12px 0;}`],
})

export class AppDatePickerComponent {
  // 展示日期类型 date 基本日期 range 日期范围
  @Input() dateType = 'date';
  /* ---------- 基本属性 ---------- */
  // 展示的日期格式
  @Input() nzFormat = 'yyyy-MM-dd HH:mm:ss';
  // 在面板中添加额外的页脚
  @Input() nzRenderExtraFooter;
  /* ---------- 扩展属性 ---------- */
  // 增加时间选择功能
  @Input() nzShowTime = true; /* {
    nzFormat: 'HH:mm:ss',
    nzDisabledHours(): number[] {
      return [ 1, 2, 3 ];
    },
    nzDisabledMinutes(hour: number): number[] {
      if (hour === 4) {
        return [ 20, 21, 22, 23, 24, 25 ];
      } else {
        return [];
      }
    },
    nzDisabledSeconds(hour: number, minute: number): number[] {
      if ((hour === 5) && (minute === 1)) {
        return [ 20, 21, 22, 23, 24, 25 ];
      } else {
        return [];
      }
    },
    nzHideDisabledOptions: true,
    nzDefaultOpenValue: [ new Date(2018, 12, 11, 0, 0, 0), new Date(2018, 12, 11, 23, 59, 59) ]
  } */
  // 时间是否可以设置
  @Input() isSetTime = true;
  // 是否显示清除按钮
  @Input() nzAllowClear = true;
  // 日期
  @Input() value;
  /* ---------- 日期选择属性 ---------- */
  // 是否展示“今天”按钮
  @Input() nzShowToday = true;
  // 输入框提示文字
  @Input() nzPlaceHolder = appModuleOptionalParameter.datePicker.placeholder;

  @Input() nzInputReadOnly = false;



  /* ---------- 范围日期选择属性 ---------- */
  // tslint:disable-next-line: variable-name
  _Date = new Date();
  // 预设时间范围快捷选择
  @Input() nzRanges = {
    今天: [
      new Date(this._Date.getFullYear(), this._Date.getMonth(), this._Date.getDate(), 0, 0, 0),
      new Date(this._Date.getFullYear(), this._Date.getMonth(), this._Date.getDate(), 23, 59, 59)
    ]
  };

  /* ---------- 回调事件 ---------- */
  // 时间发生变化的回调
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  // 点击确定按钮的回调
  @Output() nzOnOk: EventEmitter<any> = new EventEmitter();


  /* ---------- 禁用属性 ---------- */
  // 禁用状态
  @Input() nzDisabledStatus = true;
  // @Input() nzDisabledStatusOther = true;
  // 禁用
  @Input() nzDisabled = false;

  // 开始时间
  startTime;
  // 结束时间
  endTime;
  // 不可选择的日期
  @Input() nzDisabledDate = (current: Date, partial: 'start' | 'end'): boolean => {
    if (this.nzDisabledDate) {
      if (this.nzDisabledStatus) {
        return differenceInCalendarDays(this._Date, current) > 0;
      }
    } else {
      return true;
    }
  }
  // 不可选择的时间
  @Input() nzDisabledTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => this.range(0, 0),
        nzDisabledMinutes: () => this.range(0, 0),
        nzDisabledSeconds: () => this.range(0, 0)
      };
    }
    return {
      nzDisabledHours: () => this.range(0, 0),
      nzDisabledMinutes: () => this.range(0, 0),
      nzDisabledSeconds: () => this.range(0, 0)
    };
    // return {
    //   nzDisabledHours: () => this.range(0, 0),
    //   nzDisabledMinutes: () => this.range(0, 0),
    //   nzDisabledSeconds: () => this.range(0, 0)
    // };
  }
  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  // 时间发生变化的回调
  nzOnCalendarChange(choice): void {
    if (choice.length === 2 ) {
      choice[0] = new Date(choice[0].getFullYear(), choice[0].getMonth(), choice[0].getDate(), 0,  0, 0);
      choice[1] = new Date(choice[1].getFullYear(), choice[1].getMonth(), choice[1].getDate(), 23, 59, 59);
      this.handleDate(choice, this.dateType);
    }
  }
  change(choice): boolean {
    if (choice === null || choice.length === 0) {
      this.ngModelChange.emit('');
      return false;
    }
    if (this.dateType === 'date') {
      this.handleDate(choice, this.dateType);
    }
  }

  handleDate(choice, dateType): void | boolean {
    if (!choice) {
      return false;
    }
    let VALUE;
    let EMIT_VALUE;
    if (choice !== undefined) {
      switch (dateType) {
        case 'date':
          VALUE = new Date(choice);
          EMIT_VALUE = DateServices(choice);
          break;
        case 'range':
          if (choice.length === 0) {
            return false;
          }
          let START = new Date(choice[0].getFullYear(), choice[0].getMonth(), choice[0].getDate(), 0, 0, 0);
          let END = new Date(choice[1].getFullYear(), choice[1].getMonth(), choice[1].getDate(), 23, 59, 59);
          if (this.isSetTime) {
            START = new Date(choice[0]);
            END = new Date(choice[1]);
          }
          VALUE = [START, END];
          EMIT_VALUE = [DateServices(START), DateServices(END)];
          break;
        default:
          break;
      }
    }

    this.value = VALUE;
    this.ngModelChange.emit(EMIT_VALUE);
  }

  // 点击确定按钮的回调
  onOk(ev): void {
    this.nzOnOk.emit(this.value);
  }
  // 弹出日历和关闭日历的回调
  nzOnOpenChange(choice): void{
    if (!choice) {
      this.handleDate(this.value, this.dateType);
    }
  }
}
