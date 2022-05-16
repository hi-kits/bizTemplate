/**
 * Popover 组件
 * @class AppPopoverComponent
 * @version 0.0.1
 * @author by fico on 2019/03/28
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-popover, [app-popover]',
  templateUrl: './app.popover.html',
})
export class AppPopoverComponent {
  // 标题
  @Input() title = '';
  // 是否可见
  @Input() visible = false;
  // 是否可见
  @Input() contentTemplate;
}
