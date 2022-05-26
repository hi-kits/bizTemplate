/**
 * 搜索页面
 * @class: APPLookupComponent
 * @version: 0.0.1
 * @date: 2018/09/12
 * @author: fico
 * @description:
 */
import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 项目参数
import { AppParameter } from '../../app.parameter';
// 查询页面函数混入
import { LookupMixin } from '@shared/mixins/lookup.mixin';

@Component({
  selector: 'app-lookup',
  templateUrl: './app.lookup.component.html',
})

export class APPLookupComponent extends LookupMixin implements OnInit {
  // ------------------ 构造函数 ------------------
  constructor(
    private formBuilder: FormBuilder,

  ) {
    super();
    this.createForm();
  }

  isLoading = false;
  // 分类模糊 end
  // ------------------ 参数 ------------------
  @Input() searchInfo;
  @Output() searchSubmitChange: EventEmitter<number> = new EventEmitter();

  // ------------------ 自定义函数 ------------------
  // 创建表单元素
  createForm(): void {
    this.SearchForm = this.formBuilder.group({
      // 推荐词名称
      carouselwordName: '',
    });
  }
  // 重置
  reset(): void {
    super.reset(() => {
    });
  }
  // 组件初始化
  ngOnInit(): void {
  }
}
