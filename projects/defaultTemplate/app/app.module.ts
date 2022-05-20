/* ----- 主库 ----- */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// http 模块
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// 基本路径
import { APP_BASE_HREF } from '@angular/common';
// NG-ZORRO
// 页面模块
import { AppComponent } from './app.component';
// 页面路由
import { AppRoutingModule } from './app.routing.module';
// 路径缓存服务
import { RecordHistoryModule } from '@shared/services/app.recordHistory.services';

// http拦截
import { NoopInterceptor } from '@shared/guard';
// app参数
import { AppParam } from '@user';
import { environment } from '@env/environment';

@NgModule({
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 页面
    AppComponent,
  ],
  // 导入其他模块，这样本模块可以使用暴露出来的组件、指令、管道等
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RecordHistoryModule
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // http拦截
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    // APP base 配置
    {
      provide: APP_BASE_HREF,
      useValue: environment.publicBase
    },
    // APP信息
    AppParam
  ],
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置 bootstrap 属性。
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    private appParam: AppParam,
  ) {
    // 测试环境
    this.appParam.isTestParam =  environment.IS_TEST;
  }
}
