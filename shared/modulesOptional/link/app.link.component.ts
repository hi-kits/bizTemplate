/**
 * 链接到组件
 * @export
 * @class APPLinkComponent
 * @version 0.0.1
 * @author by fico on 2021/06/11
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-link, *[app-link]',
  templateUrl: './app.link.component.html',
  styleUrls: ['./app.link.component.css'],
})

export class APPLinkComponent implements OnInit {
  // ------------------ 构造函数 ------------------
  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  // ------------------ 参数 ------------------
  /**
   * 页面展示信息
   * 以json数组格式进行传参
   */
  @Input() info;
  /**
   * 当前页码数据改变的回调函数
   */
  @Output() setData: EventEmitter<any> = new EventEmitter();
  // 表单数据
  linkForm!: FormGroup;
  // 表单数据组
  formList;
  /** 1-文章；2-商品；3-扫一扫；4-设备绑定；5-家人管理；6-自定义链接 */
  menuList = [
    { type: 1, name: '文章' },
    { type: 2, name: '商品' },
    { type: 3, name: '扫一扫' },
    { type: 4, name: '设备绑定' },
    { type: 5, name: '家人管理' },
    { type: 6, name: '自定义链接' },
  ];
  // ------------------ 自定义函数 ------------------
  ngOnInit(): void {
    this.createForm();
  }
  /**
   * 创建图文导航整体容器的表单
   */
  createForm(): void {
    this.formList = {
      linkType: this.info.linkType || 6,
      linkName: this.info.linkName,
      link: this.info.link,
    };
    // 初始化表单
    this.linkForm = this.formBuilder.group({ ...this.formList }/*,  {updateOn: 'blur'} */);
  }
  setLinkType(): void {}
  /**
   * 表单中各个字段变化时更新视图
   */
  formFieldValueChange(): void {
    this.setData.emit(this.linkForm.value);
  }
}
