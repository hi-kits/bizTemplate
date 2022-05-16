/**
 * NG-ZORRO 公共组件定义
 * @class ANTDCOMMONMODULES
 * @version 0.0.1
 * @author by fico on 2021/04/19
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 对于公共部分组件进行导入导出
 */
import { NgModule } from "@angular/core";

// NG-ZORRO库文件
// --------------------- 基础配置 ---------------------
import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";
/* 配置 ng-zorro-antd 国际化 */
import { NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh);
// NG-ZORRO库 全局配置项
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 100 },
  notification: { nzTop: 240 },
};
// --------------------- 基础组件 ---------------------
// 栅格
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzTagModule } from "ng-zorro-antd/tag";

// --------------------- 扩展组件 ---------------------
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzListModule } from "ng-zorro-antd/list";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzCascaderModule } from "ng-zorro-antd/cascader";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
// NG-ZORRO库 引用对象
const NGZORRO = [
  NzCarouselModule,
  NzEmptyModule,
  NzCascaderModule,
  NzStepsModule,
  NzListModule,
  NzSliderModule,
  NzRadioModule,
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
  NzTagModule,

  NzCheckboxModule,
  NzTimePickerModule,
  NzDatePickerModule,
  NzSwitchModule,
  NzTabsModule,
  NzDividerModule,
  NzUploadModule,
  NzCardModule,
  NzDropDownModule,
  NzDrawerModule,
  NzInputNumberModule,
  NzAlertModule,
  NzTreeSelectModule,
];

@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [...NGZORRO],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  // 这里引入共享的组件
  declarations: [],
  // 这里将共享的组件放入到导出的出口中
  exports: [...NGZORRO],
  // 自定义html元素
  schemas: [],

  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class ANTDCOMMONMODULES {}
