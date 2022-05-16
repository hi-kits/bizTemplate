/**
 * 首页页面
 * @class: APPIndexComponent
 * @version 0.1.0
 * @author by fico on 2018/09/12
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2020/09/16 0.1.0 新增mixin混入方式
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 列表页面函数混入
import { ViewIndexMixin } from '@shared/mixins/view.index.mixin';
// 数组处理
import { ArrayIndex } from '@mid/common/extend/arrayIndex';

// 页面事件
import { ViewAction } from '../../app.action';
// 项目参数
import { AppParameter } from '../../app.parameter';
// 消息提醒
import { Message } from '@shared/modulesOptional/message/app.message';
@Component({
  selector: 'app-root',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.css']
})

export class APPIndexComponent extends ViewIndexMixin implements OnInit {
  // ------------------ 构造函数 ------------------
  constructor(
    private message: Message,
    private formBuilder: FormBuilder,
    private appParameter: AppParameter,
    private viewAction: ViewAction,
  ) {
    super(viewAction);
    this._ParentItem = this.appParameter.currentItem.view;
    this.columns = [ {
        title: '页面名称',
        key: 'pageName',
      },
      {
        title: '模板名称',
        key: 'mouldName',
      },
      {
        title: '提审人',
        key: 'submitBy',
        width: '120px',
      },
      {
        title: '提审时间',
        key: 'submitTime',
        width: '150px',
      },
      {
        title: '审核人',
        key: 'reviewBy',
        width: '120px',
      },
      {
        title: '审核时间',
        key: 'reviewTime',
        width: '150px',
      },
      {
        title: '审核状态',
        key: 'reviewStatus',
        width: '130px',
        logic: (record, index, text) => {
          return this.reviewStatusList.INDEX[text];
        }
      },
    ];
  }

  // ------------------ 参数 ------------------
  // 父组件中获得子组件的引用
  @ViewChild('Search', {static: false}) SearchSubmit;
  @ViewChild('Table', {static: false}) Table;
  // 审核状态
  reviewStatusList = ArrayIndex({
    array: this.appParameter.option.reviewStatus,
    indexs: [{
      key: 'code',
      value: 'name'
    }],
  });
  // 缩略图地址
  thumbnailUrl;
  // 表单数据列表
  formList;
  // 提交表单
  AuditForm;
  // 是否显示加载
  isLoading = false;
  // 文件列表
  fileList;

  // ------------------ 自定义函数 ------------------
  // 页面数据变化
  pageDataChange(): void {
    this.loading = false;
    this.tableData = [this.appParameter.currentItem.view];
    this.countHeight(200);
  }

  // 获取缩略图
  getThumbnailUrl(): void {
    this.viewAction.get('thumbnailUrl', {
      type: this._ParentItem.type,
      mouldId: this._ParentItem.mouldId
    }, (ResultData) => {
      this.thumbnailUrl = ResultData.result.thumbnailUrl;
    });
  }

  // 组件初始化
  ngOnInit(): void {
    this.pageDataChange();
    this.getThumbnailUrl();
    this.createForm();

  }

  // 创建表单元素
  createForm(): void {
    this.formList = {
      // 审核描述
      reviewDesc: [ '' ],
      // 测试报告地址
      reportUrl: [ '' ],
      // 审核结果 3 不通过 2 通过
      reviewStatus: [ '' ],
      // pushRuleId
      id: this._ParentItem.id,
    };
    // 初始化表单
    this.AuditForm = this.formBuilder.group({...this.formList});
  }
  /* ---------- 文件上传 ---------- */
  fileChange(FileList): void {
    FileList.forEach(element => {
      if (element.status !== 'removed') {
        this.AuditForm.patchValue({
          reportUrl: element.response.result.url
        });
      }
    });
  }
  // 保存
  submitForm(status): void {
    const CONTROLS = this.AuditForm.controls;
    for (const key of Object.keys(CONTROLS)) {
      CONTROLS[key].markAsDirty();
      CONTROLS[key].updateValueAndValidity();
    }
    const AuditForm = {...this.AuditForm.value};
    if (!status && !this.AuditForm.value.reviewDesc) {
      return this.message.warning('请输入不通过的原因');
    }
    AuditForm.reviewStatus = status ? '2' : '3';
    this.isLoading = true;
    this.viewAction.set('audit', AuditForm, () => {
      history.go(-1);
    }).finally( () => {
      this.isLoading = false;
    });

  }

}
