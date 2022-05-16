/**
 * 首页页面
 * @class: APPIndexComponent
 * @version 0.0.2
 * @author by fico on 2018/10/08
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2020/09/12 0.0.2 新增mixin混入方式
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// 列表页面函数混入
import { ViewIndexMixin } from '@shared/mixins/view.index.mixin';

// 页面事件
import { ViewAction } from '../../app.action';
// 参数
import { AppParameter } from '../../app.parameter';
import { DateServices } from '@shared/services/date.services';
// 页面接口
import { Power } from '@shared/interface/tabular';
// 操作鉴权
import { ValidatorAction } from '@shared/services/app.validator.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.css']
})

export class APPIndexComponent extends ViewIndexMixin implements OnInit  {
  // ------------------ 构造函数 ------------------
  constructor(
    private router: Router,
    private appParameter: AppParameter,
    private viewAction: ViewAction,
    private validatorAction: ValidatorAction,
  ) {
    super(viewAction);
  }

  // ------------------ 参数 ------------------
  // 页面索引
  public get PageIndex(): number {
    return this.appParameter.currentItem.viewPage.index;
  }
  public set PageIndex(value) {
    this.appParameter.currentItem.viewPage.index = value;
  }
  // 页面数据分页
  public get PageSize(): number {
    return this.appParameter.currentItem.viewPage.size;
  }
  public set PageSize(value) {
    this.appParameter.currentItem.viewPage.size = value;
  }
  // 父组件中获得子组件的引用
  @ViewChild('Search', {static: false}) SearchSubmit;
  @ViewChild('Table', {static: false}) Table;
  @ViewChild('Modal', {static: false}) Modal;

  // 状态
  statusTypeList = this.appParameter.option.statusType;
  // 内容状态
  auditStatusList = this.appParameter.option.auditStatus;
  auditStatusValue = 9;
  radioValueB = '';

  // 权限控制显示
  power: Power = {
    // 审核
    audit : {
      code: 'appPageAudit/audit',
      type: true,
      bind: {
        name: '审核',
        class: 'AuditO',
        hide: (record) => {
          return record.reviewStatus === 0 ? false : true;
        },
        call: (record) => {
          this.audit(record.id);
        }
      }
    },
    // 查看
    view : {
      code: 'appPageAudit/view',
      type: true,
      bind: {
        name: '查看',
        hide: (record) => {
          return record.reviewStatus === 3 ? true : false;
        },
        call: (record) => {
          this.appParameter.currentItem.view = record;
          this.router.navigate(['/audit/index']);
        }
      }
    },
  };

  // ------------------ 自定义函数 ------------------
  // 计算鉴权操作
  validator(callback): void {
    this.validatorAction.getValidator.then(() => {
      const render = this.validatorAction.sort(this.power);
      this.columns = [{
        title: '序号',
        key: 'index',
        width: '50px',
        logic: (record, index, text) => {
          return index;
        }
      }, {
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
          width: '80px',
        },
        {
          title: '提审时间',
          key: 'submitTime',
          width: '130px',
          logic: (record, index, text) => {
            return text ? text : '--';
          }
        },
        {
          title: '审核人',
          key: 'reviewBy',
          width: '80px',
          logic: (record, index, text) => {
            return text ? text : '--';
          }
        },
        {
          title: '审核时间',
          key: 'reviewTime',
          width: '130px',
          logic: (record, index, text) => {
            return text ? text : '--';
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: '120px',
          render: [
          {
            name: '审核中',
            class: 'AuditA',
            hide: (record) => {
              return record.reviewStatus === 1 ? false : true;
            },
            disabled: (record) => {
              return true;
            },
            call: (record) => {
            }
          },
          {
            name: '已通过',
            class: 'AuditB',
            hide: (record) => {
              return record.reviewStatus === 2 ? false : true;
            },
            disabled: (record) => {
              return true;
            },
            call: (record) => {
            }
          },
          {
            name: '未通过',
            class: 'AuditC',
            hide: (record) => {
              return record.reviewStatus === 3 ? false : true;
            },
            disabled: (record) => {
              return true;
            },
            call: (record) => {
            }
          },
          ...render
          ]
      }];
      callback();
    });
  }
  // 页面数据变化
  pageDataChange(): void {
    super.pageDataChange('listQuery', {
      index: this.PageIndex >= this.PageSize ? (this.PageIndex / this.PageSize) + 1 : this.PageIndex + 1,
      pageSize: this.PageSize,
      searchObj: this.searchObj,
    }, () => {
      // this.tableData = [...this.tableData, ...this.tableData, ...this.tableData, ...this.tableData, ...this.tableData, ...this.tableData,]
      this.countHeight();
    });
  }
  foldChange(ev): void {
    this.isShowQuery = ev;
    this.countHeight();
  }
  // 组件初始化
  ngOnInit(): void {
    this.validator(() => {
      this.isTable = true;
      this.pageDataChange();
    });
  }
  // 审核开始
  audit(id): void {
    this.viewAction.set('start', {id}, () => {
      this.pageDataChange();
    });
  }

  // 审核状态
  auditStatus(val): void {
    this.auditStatusValue = val;
    if (val === 9) {
      this.searchObj = {};
    } else {
      this.PageIndex = 0;
      this.searchObj = {...this.searchObj, reviewStatus: val};
    }
    this.pageDataChange();
  }

  /** 查询提交 */
  searchSubmitChange(): void {
      this.searchObj = { ...this.searchObj, ...this.SearchSubmit.searchInfo };
      if (this.SearchSubmit.searchInfo.rangeDate) {
        this.searchObj.submitStartTime = DateServices(new Date(this.searchObj.rangeDate[0]), 'yyyy-MM-dd+hh:mm:ss');
        this.searchObj.submitEndTime = DateServices(new Date(this.searchObj.rangeDate[1]), 'yyyy-MM-dd+hh:mm:ss');
      } else {
        this.searchObj.submitStartTime = null;
        this.searchObj.submitEndTime = null;
      }
      delete this.searchObj.rangeDate;
      this.PageIndex = 0;
      // this.PageSize = 20;
      this.pageDataChange();
  }


}
