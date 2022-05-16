/**
 * 首页展示组件
 * @class APPPageHomeComponent
 * @version 0.0.1
 * @author by fico on 2021/03/30
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './app.pageHome.component.html',
  styleUrls: ['./app.pageHome.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class APPPageHomeComponent implements OnInit {
  // ------------------ 构造函数 ------------------
  constructor(
  ) { }

  // ------------------ 参数 ------------------
  /**
   * 页面展示信息
   * 以json数组格式进行传参
   */
  @Input() info: any[];

  // 删除视频
  @Output() nzBeforeRemove: EventEmitter<any> = new EventEmitter();


  // ------------------ 自定义函数 ------------------
  ngOnInit(): void {
  }


}
