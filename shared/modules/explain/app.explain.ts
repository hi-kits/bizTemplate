/**
 * 错误提示组件
 * @export
 * @class AppExplainComponent
 * @version 0.0.1
 * @author by fico on 2019/01/12
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explain',
  template: `<nz-form-explain *ngIf="formInfo.get(name).dirty && formInfo.get(name).errors" [ngStyle]="{color:'red'}">
              {{formInfo.getError('ErrorValue',name)?.info}}
             </nz-form-explain>`,
})
/** @deprecated 此组件已废弃. */
export class AppExplainComponent {
  // 信息
  @Input() formInfo;
  // 名称
  @Input() name;
}
