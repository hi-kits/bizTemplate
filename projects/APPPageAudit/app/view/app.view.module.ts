/**
 * 视图基本模型
 * @class: ViewModule
 * @version: 0.0.2
 * @date: 2018/04/24
 * @author: fico
 * @description:
 * 2018/06/08  0.0.3 增加国际化配置 TranslateModule
 * 2018/06/08  0.0.4 增加根路径参数 ROOT_PATH
 */
// 主库
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 路由相关模块
import { RouterModule, Routes } from '@angular/router';
// 公共模块
import { COMMONMODILES } from '../../commonModule/commonModule.module';
// 函数节流
import { Throttle } from '@mid/data/throttle';
// 页面事件
import { ViewAction } from '../app.action';

/* -------------------------- 页面组件 --------------------------*/
/* 首页 */
import { APPIndexComponent } from './index/app.index.component';
/* 查找 */
import { APPLookupComponent } from './_lookup/app.lookup.component';

const Component = [
  APPIndexComponent,
  APPLookupComponent
];



/*定义路由const表示不可改变*/
const viewRoutes: Routes = [
  // path是路由访问的路径
  // 留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
  // component是映射的组件
  // children是嵌套组件的包含层
  { path: 'index', component: APPIndexComponent},
  { path: '**', redirectTo: 'index', pathMatch: 'full' /* 必须要设置 */}
];
@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [ RouterModule.forChild(viewRoutes) ],
  // declarations 的子集，可用于其它模块的组件模板
  exports: [ RouterModule ],
})
export class AppViewRoutingModule {}

@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppViewRoutingModule,
    // 公共模块
    COMMONMODILES,
  ],
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 页面
    ...Component
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // 事件
    ViewAction,
    Throttle
  ]
})
export class ViewModule {}
