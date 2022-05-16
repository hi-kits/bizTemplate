/**
 * header 组件
 * @export
 * @class AppHeaderComponent
 * @version 0.0.3
 * @author by fico on 2018/02/09
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 *      APP header 组件的封装
 *      提供返回事件
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.css']
})

export class AppHeaderComponent {
  @Input() title: [];
  @Input() subtitle;
  @Input() onestop;

  constructor(
    private router: Router
  ) {}
  // 返回事件
  link(itme): void {
    if (itme.callback) {
      itme.callback();
    }
    if (itme.link) {
      this.router.navigate(typeof itme.link === 'string' ? [itme.link] : itme.link);
    }
    // 如果是一站式平台，点击父级菜单需要像框架发消息
    if (this.onestop) {
      top.postMessage({
        payload: false,
        type: 'disabledAppSelect'
      }, '*');
    }
  }

}
