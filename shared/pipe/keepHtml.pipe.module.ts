/**
 * 保持Html模块
 * @export
 * @class EscapeHtmlPipeModule
 * @version 0.0.1
 * @author by fico on 2021/07/28
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { NgModule } from '@angular/core';
// 页面组件
import { EscapeHtmlPipe } from './keepHtml.pipe';


const Component = [
  EscapeHtmlPipe,
];

@NgModule({
    // 本模块声明的组件模板需要的类所在的其它模块。
    imports: [],
    // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
    // 这里引入共享的组件
    declarations: [
        ...Component,
    ],
    // 这里将共享的组件放入到导出的出口中
    exports: [
        ...Component
    ],
        // 自定义html元素
    schemas: [],

    // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
    providers: [
    ],

})
export class EscapeHtmlPipeModule {}

