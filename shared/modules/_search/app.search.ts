/**
 * 查询组件
 * @export
 * @class AppSearchWrapComponent
 * @version 0.0.1
 * @author by fico on 2018/10/09
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: '<section class="SearchWrap"><ng-content></ng-content></section>',
  styles: [`
  :host .SearchWrap{padding:4px 50px 4px 12px;background: #fbfbfb;min-height:40px}
  :host .SearchWrap ::ng-deep .ant-advanced-search-form .ant-form-item{margin:6px 0;}
  :host .SearchWrap ::ng-deep .ant-calendar-picker {width: 250px !important;}
  :host .SearchWrap ::ng-deep .FormControl{width:75%}
  `],
})

export class AppSearchWrapComponent {}
