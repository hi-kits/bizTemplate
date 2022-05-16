/**
 * 表格展示
 * @class AppTableDisplayComponent
 * @version 0.0.1
 * @author by fico on 2019/07/23
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleOptionalParameter } from '@shared/modulesOptional/app.modulesOptional.parameter';

// tslint:disable-next-line: new-parens
const appModuleOptionalParameter = new AppModuleOptionalParameter;

@Component({
  selector: 'app-display',
  template: `<button nz-button nzShape="circle" [attr.title]="buttonTitle" nzType="dashed" style="min-width: 0px">
    <i nz-icon nzType="{{icon}}"></i>
  </button>`,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(click)': 'stateChange(displayState)'
  },
})

export class AppTableDisplayComponent {
  // 文本
  buttonTitle: string;
  icon: string;
  // 折叠状态
  private _displayState;
  @Input()
  public get displayState(): boolean {
    return this._displayState;
  }
  public set displayState(value) {
    this._displayState = value;
    this.icon = value ? 'arrows-alt' : 'shrink';
    this.buttonTitle = appModuleOptionalParameter.tableDisplay[value ? 1 : 0];
  }
  // 状态变化函数
  @Output() displayModeChange: EventEmitter<any> = new EventEmitter();

  // 状态改变
  private stateChange(state): void {
    this.displayState = !state;
    this.displayModeChange.emit(this.displayState);
  }

}
