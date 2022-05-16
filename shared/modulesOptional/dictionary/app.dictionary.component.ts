/**
 * 获取字典数据 组件
 * @class: DictionaryComponent
 * @version: 0.0.1
 * @date: 2018/12/11
 * @author: fico
 * @description:
 */
 import { Component, Input, Output, EventEmitter } from '@angular/core';
 import { DictionaryAction } from './app.dictionary.action';
 declare const $$: any;

 @Component({
   selector: '*[app-dictionary]',
   template: '<ng-content></ng-content>',
   host: {
     '(click)': 'getDictionary($event)'
   }
 })

 export class DictionaryComponent  {

   // 字典编号
   @Input() dictCode: any;
   // 分享返回
   @Output() queryDicArr: EventEmitter<any> = new EventEmitter();

   constructor(
     private viewAction: DictionaryAction,
   ) {
   }
   // 调取字典接口
   getDictionary(name: string): void {
     this.viewAction.getDic({...this.dictCode} , (r) => {
       this.queryDicArr.emit(r);
     });
   }

 }
