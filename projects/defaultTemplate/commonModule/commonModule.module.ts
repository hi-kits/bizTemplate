/*
 * @Author: liulina
 * @Date: 2020-08-27 15:25:40
 * @Last Modified by: liulina
 * @Last Modified time: 2020-08-27 15:39:58
 */

/**
 * 公共组件定义
 * @class: COMMONMODILES
 * @version: 0.0.1
 * @date: 2018/05/09
 * @description:
 *  对于公共部分组件进行导入导出
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from '@shared/pipe/keepHtml.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// 公共组件
import {
  AppHeaderComponent,
  AppTableComponent,
  AppModalComponent,
  AppPopoverComponent,
  AppToolBarComponent,
  AppSearchWrapComponent,
} from '@shared/modules';

// 可选模块
import { AppUploadComponent } from '@shared/modulesOptional/upload/app.upload';
import { AppExplainComponent } from '@shared/modules/explain/app.explain';
import { AppFoldComponent } from '@shared/modulesOptional/fold/app.fold';
import { Message } from '@shared/modulesOptional/message/app.message';
import { AppDatePickerComponent } from '@shared/modulesOptional/datePicker/app.datePicker';
//  富文本编辑器
import { AppFroalaEditorModule } from '@shared/modulesOptional/froala-editor/app.froalaEditor.module';

// app参数
import { AppParam } from '@user';

// NG-ZORRO库文件
// --------------------- 基础配置 ---------------------
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
/* 配置 ng-zorro-antd 国际化 */
/* eslint-disable */
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// NG-ZORRO库 全局配置项
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 100 },
  notification: { nzTop: 240 }
};
// --------------------- 基础组件 ---------------------
// 栅格
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

// --------------------- 扩展组件 ---------------------
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
// NG-ZORRO库 引用对象
const NGZORRO = [
  NzGridModule,
  NzTableModule,
  NzPaginationModule,
  NzButtonModule,
  NzFormModule,
  NzIconModule,
  NzToolTipModule,
  NzMessageModule,
  NzModalModule,
  NzPopoverModule,
  NzSelectModule,
  NzInputModule,
  NzBreadCrumbModule,
  NzPopconfirmModule,
  NzStatisticModule,

  NzCheckboxModule,
  NzTimePickerModule,
  NzDatePickerModule,
  NzSwitchModule,
  NzTabsModule,
  NzDividerModule,
  NzUploadModule,
  NzCardModule,
  NzPageHeaderModule,
  NzInputNumberModule,
  NzTreeSelectModule
];

const Component = [
  AppHeaderComponent,
  AppTableComponent,
  AppModalComponent,
  AppPopoverComponent,
  AppToolBarComponent,
  AppSearchWrapComponent
];
const ModulesOptional = [
  AppExplainComponent,
  AppFoldComponent,
  AppUploadComponent,
  AppDatePickerComponent
];

@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppFroalaEditorModule,
    ...NGZORRO,
  ],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  // 这里引入共享的组件
  declarations: [
    ...ModulesOptional,
    ...Component,
    EscapeHtmlPipe,
  ],
  // 这里将共享的组件放入到导出的出口中
  exports: [
    CommonModule,
    AppFroalaEditorModule,
    ...ModulesOptional,
    ...Component,
    ...NGZORRO,
  ],
  // 自定义html元素
  schemas: [],

  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    AppParam,
    Message,
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    /* eslint-disable */
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class COMMONMODILES { }
