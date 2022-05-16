/**
 * 抽屉 组件
 * @class AppDrawerComponent
 * @version 0.0.1
 * @author by fico on 2019/01/02
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './app.drawer.html',
  styleUrls: ['./app.drawer.css'],
})

export class AppDrawerComponent {
  // 标题
  @Input() nzTitle;
  // 抽屉的方向 'top''right''bottom''left'
  @Input() nzPlacement = 'right';
  // 是否显示
  @Input() nzVisible = false;
  // 是否显示右上角的关闭按钮
  @Input() nzClosable = true;
  // 宽度, 只在方向为 'right'或'left' 时生效
  @Input() nzWidth = 500;
  // 高度, 只在方向为 'top'或'bottom' 时生效
  @Input() nzHeight = 500;
  // x 坐标移量(px), 只在方向为 'right'或'left' 时生效
  @Input() nzOffsetX = 0;
  // y 坐标移量(px), 高度, 只在方向为 'top'或'bottom' 时生效
  @Input() nzOffsetY = 0;
  // 抽屉的页脚
  @Input() nzFooter;
  // 对话框外层容器的类名
  @Input() nzWrapClassName = 'DrawerWrap';
  // 对话框外层容器的类名
  @Input() nzBodyStyle;
  // 点击蒙层是否允许关闭
  @Input() nzMaskClosable = true;

  // 选中的 nz-option 发生变化时，调用此函数
  @Output() nzOnClose: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  close(): void {
    this.nzVisible = false;
    this.nzOnClose.emit(this.nzVisible);
  }
}
