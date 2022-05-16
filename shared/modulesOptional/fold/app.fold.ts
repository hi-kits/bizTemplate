/**
 * 折叠组件
 * @class AppFoldComponent
 * @version 0.0.1
 * @author by fico on 2019/01/02
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleOptionalParameter } from '@shared/modulesOptional/app.modulesOptional.parameter';

// tslint:disable-next-line: new-parens
const appModuleOptionalParameter = new AppModuleOptionalParameter;

@Component({
  selector: 'app-fold',
  template: `<a href="javascript:;" style="padding:0 1em">{{text}} <i nz-icon nzType="{{icon}}"></i></a>`,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(click)': 'queryState(foldState)'
  },
})

export class AppFoldComponent {
  // 文本
  text;
  icon;
  // 折叠状态
  private _foldState;
  @Input()
  public get foldState(): boolean {
    return this._foldState;
  }
  public set foldState(value) {
    this._foldState = value;
    this.icon = value ? 'up' : 'down';
    this.text = appModuleOptionalParameter.fold[value ? 0 : 1];
  }
  // 状态变化函数
  @Output() foldChange: EventEmitter<any> = new EventEmitter();

  // 查询状态
  queryState(state): void {
    this.foldState = !state;
    this.foldChange.emit(this.foldState);
  }

}
