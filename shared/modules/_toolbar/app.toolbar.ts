/**
 * 工具栏组件
 * @export
 * @class AppToolBarComponent
 * @version 0.0.1
 * @author by fico on 2018/10/09
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: '<section class="ToolBarWrap"><ng-content></ng-content></section>',
  styles: [`
  :host .ToolBarWrap{position: relative; margin:2px 0 4px; padding:4px 10px; background-color: #fbfbfb;}
  :host .ToolBarWrap ::ng-deep .Right{text-align: right;line-height: 28px}
  :host .ToolBarWrap ::ng-deep .Right button{margin-left:6px;margin-right:0}
  :host .ToolBarWrap ::ng-deep button{min-width: 100px;margin-right:12px}
  `],
})

export class AppToolBarComponent {}
