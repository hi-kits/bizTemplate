/**
 * PreviewModal 组件
 * @class AppPreviewModalComponent
 * @version 0.0.1
 * @author by fico on 2019/04/24
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './app.previewModal.html',
})
export class AppPreviewModalComponent {
  // 是否可见
  @Input() isVisible;
  nzZIndex = 1000;
  // 点击遮罩层或右上角叉或取消按钮的回调
  @Output() nzOnCancel = new EventEmitter();

  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit(this.isVisible);
  }
}
