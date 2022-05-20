/**
 * 自定义指令，在模板上声明遍历
 * @version 0.0.1
 * @author by hzb on 2022/3/7 5:16 下午
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appVar]'
})
export class AppVarDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  context: any = {};

  @Input() set appVar(context: any) {
    this.context.$implicit = this.context.appVar = context;
    this.uploadView();
  }

  uploadView(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }
}
