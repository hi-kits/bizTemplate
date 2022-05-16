/**
 * 路由基本模型
 * @class: AppRoutingModule
 * @version: 0.0.6
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      场景路由的定义和守卫的绑定
 * 2018/06/08 0.0.7 增加国际化配置
 */
/* ----- 主库 ----- */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 路由相关模块
import { RouterModule, Routes } from '@angular/router';
// 参数
import { AppParameter } from './app.parameter';
import { BasicServices } from '@shared/services';
import { ValidatorAction } from '@shared/services/app.validator.services';
import { DictionaryServices } from '@shared/services/dictionary.services';

const _AppParam = new AppParameter;

/*定义路由const表示不可改变*/
const routes: Routes = [
  /*
   path:是路由访问的路径,
        留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
   component:是映射的组件
   canActivate 是内置拦截器， RouteguardService 是鉴权服务
   pathMatch:为字符串默认为前缀匹配 "prefix"; "full" 为完全匹配。
   redirectTo:指向为路径，既path
   outlet:字符串，路由目标，面对多个路由的情况
   children:Routes 子路由相关
   */
  // 首页
  { path: 'view', data: { title: _AppParam.info.TITLE },
    loadChildren: () => import('./view/app.view.module').then(m => m.ViewModule)
  },
  // 审核
  { path: 'audit', data: { title: _AppParam.info.TITLE },
    loadChildren: () => import('./audit/app.view.module').then(m => m.ViewModule)
  },
  // 错误路由重定向[写在最后一个]
  { path: '**', redirectTo: '/view/index', pathMatch: 'full' /* 必须要设置 */}
];

@NgModule({
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 页面
    // APPToolBarComponent,
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    ValidatorAction,
    DictionaryServices,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // 注入到模块中，forChild只能用于子模块，forRoot只能用于根模块
    // forRoot有一个可选的配置参数，里面有四个选项
    // enableTracing ：在console.log中打印出路由内部事件信息
    // useHash ： { useHash: true } 把url改成hash风格，protocol://domain/#/account/login ，不使用时会影响图片路径指向
    // initialNavigation ： 禁用初始导航
    // errorHandler ：使用自定义的错误处理，来抛出报错信息；
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  // exports是导出组件，一般用于自定义组件或者模块
  // declarations 的子集，可用于其它模块的组件模板
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private basic: BasicServices,
    private validatorAction: ValidatorAction,
  ) {
    this.basic.init(_AppParam.info.PAGE_ID);
    this.validatorAction.isValidator = _AppParam.info.IS_VALIDATOR;
  }
}

// ModuleWithProviders 是个接口，就是允许ngModule和providers类型
// export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
// 上面这种写法只是把路由到处到一个变量，也就是要生效必须到相应的模块中引入(NgModule)中import进去
