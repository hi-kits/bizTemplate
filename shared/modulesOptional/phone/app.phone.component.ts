/**
 * phone 组件
 * @class AppPhoneComponent
 * @version 0.0.1
 * @author by fico on 2021/06/16
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './app.phone.component.html',
  styleUrls: ['./app.phone.component.css'],
})
export class AppPhoneComponent implements OnInit {
  // 禁用
  @Input() nzDisabled = false;
  // 最大值
  @Input() nzMax = 100;
  // 最小值
  @Input() nzMin = 0;
  // 是否只能拖拽到刻度上
  @Input() nzDots = false;
  // 步长，取值必须大于 0，并且可被 (max - min) 整除。
  @Input() nzStep = 1;
  // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
  @Input() value;
  // 双滑块模式
  @Input() nzRange = false;

  // 当 Slider 的值发生改变时，会触发 ngModelChange 事件，并把改变后的值作为参数传入。
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }





}
