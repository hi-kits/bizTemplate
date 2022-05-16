/**
 * 颜色选择组件
 * @class APPColorPickerComponent
 * @version 0.0.1
 * @author by fico on 2021/04/06
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

import { Component, Input, EventEmitter, Output, OnInit, HostBinding, HostListener } from '@angular/core';
import { Color, ColorPickerControl, ColorsTable } from '@iplab/ngx-color-picker';


@Component({
  selector: 'app-color',
  templateUrl: './app.colorPickers.component.html',
  styleUrls: ['./app.colorPickers.component.css'],
})
export class APPColorPickersComponent  implements OnInit {
  /* ---------- 显示属性 ---------- */
  public colorControl = new ColorPickerControl()
  .setValueFrom(ColorsTable.aquamarine)
  .hidePresets()
  .hideAlphaChannel();
  // 当 colorPickers 的值发生改变时，会触发 ngModelChange 事件，并把改变后的值作为参数传入。
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  /**
   * 是否显示
   */
  public isVisible = true;
  /**
   * 是否显示
   */
  @Input() public set color(color: string) {
    this.colorControl.setValueFrom(color);
  }

  @Output() public colorChange: EventEmitter<string> = new EventEmitter();

  @HostBinding('style.background-color') public get background(): string {
    const color = this.colorControl.value.toHexString();
    this.ngModelChange.emit(color);
    return color;
  }

  ngOnInit(): void {
      this.colorControl.valueChanges.subscribe((value: Color) => this.colorChange.emit(value.toHexString()));
  }

  @HostListener('click', ['$event']) public showColorPicker(event: MouseEvent): void {
      if (this.isVisible === true) {
          return;
      }
      // this.ngModelChange.emit(color);
      this.isVisible = !this.isVisible;
  }

  public overlayClick(event: MouseEvent): void {
      event.preventDefault();
      event.stopPropagation();
      this.isVisible = true;
  }

}
