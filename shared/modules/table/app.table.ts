/**
 * table 组件
 * @class AppTableComponent
 * @version 0.0.1
 * @author by fico on 2018/09/12
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

import { Component, Input, EventEmitter, Output, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
// 获取窗口大小
import { getPageSize } from '@mid/browser/getPageSize';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface Children {
  // 父级元素索引
  ParentIndex: number;
  // 二级展示数据
  data: any[];
}

@Component({
  selector: 'app-table',
  templateUrl: './app.table.html',
  styleUrls: ['./app.table.css'],
  // encapsulation: ViewEncapsulation.Emulated
})

export class AppTableComponent  implements OnInit {
  /* ---------- 显示属性 ---------- */
  /**
   * 模板文件
   * @type {  Array<TemplateRef<any>> }
   */
  @Input() template: TemplateRef<any>[];
  // 滚动高度
  scrollY = 400;
  /**
   * 最小高度
   * @type {  Number }
   */
  @Input() minHeight = 300;
  /**
   * 表格是否滚动
   * @type { Boolean }
   */
  @Input() isScroll = true;
  // /**
  //  * 自定义内容
  //  * @type { Boolean }
  //  */
  // @Input() custom;
  /**
   * 组件id
   * @type { string }
   */
  @Input() id;
  /**
   * 是否计算高度
   * @type { Boolean }
   */
  @Input() isHeight = true;
  /**
   * 是否显示分页
   * @type { Boolean }
   */
  @Input() nzShowPagination = true;
  //
  @Input() nzShowQuickJumper = false;
  @Input() nzShowTotal;
  /**
   * 合并列
   * @type { Number }
   * @private
   */
  private colspan = 1;
  /* ---------- 虚拟滚动 ---------- */
  /**
   * 是否是横向滚动
   * @type { Boolean }
   * @private
   */
  // tslint:disable-next-line: variable-name
  private _isScrollX = false;
  @Input()
  public get isScrollX(): boolean {
    return this._isScrollX;
  }
  public set isScrollX(value) {
    this._isScrollX = value;
    if (typeof this.scrollX !== 'undefined') {
      this.ngOnInit();
    }
  }
  /**
   * 横向滚动参数
   * @type { Object } { x: 1500 }
   */
  @Input() nzScroll;
  /**
   * 初始宽度
   * @type { Number }
   */
  scrollX;
  // 动态滚动值
  dynamicScroll;
  /**
   * 勾选属性位置
   * @function checkboxLeft
   * @returns { String }
   */
  get checkboxLeft(): string {
    return this.nzShowExpand ? '50px' : '0px';
  }
  /**
   * 勾选属性位置
   * @function colIndexLeft
   * @returns { String }
   */
  get colIndexLeft(): string{
    return 0 + (this.nzShowExpand ? 50 : 0) + (this.nzShowCheckbox ? 50 : 0 ) + 'px';
  }

  /* ---------- 当前页码改变/页数改变 ---------- */
  /**
   * 页面更改状态
   * @type { Boolean }
   * @private
   */
  private pageChangeStatus = true;
  /* ---------- 基本属性 ---------- */
  /**
   * 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
   * @type { Boolean }
   */
  @Input() nzFrontPagination = false;
  // expandDataCache = {};
  /**
   * 表头对象
   * @type { Array<any> }
   */
  @Input() columns: any[];
  /**
   * 列表总数
   * @type { Number }
   */
  @Input() nzTotal;
  /**
   * 加载状态
   * @type { Boolean }
   */
  @Input() nzLoading;
  /**
   * 数据列表索引
   * @type { Number }
   */
  @Input() nzListIndex = 0;
  /**
   * 当前页码
   * @type { Number }
   * @private
   */
  // tslint:disable-next-line: variable-name
  private _nzPageIndex: number;
  @Input()
  get nzPageIndex(): number {
    return this._nzPageIndex;
  }
  set nzPageIndex(value) {
    if (value === 0) {
      this.nzListIndex = 1;
    } else {
      setTimeout(() => {
        this.nzListIndex = (value / this.nzPageSize) + 1;
      }, 1);
    }
    this._nzPageIndex = value;
  }
  /**
   * 每页展示数据数量
   * @type { Number }
   */
  @Input() nzPageSize;
  /**
   * 列表数据对象
   * @type { Array<any> }
   * @private
   */
  // tslint:disable-next-line: variable-name
  private _nzData: any[] = [];
  // 表格数据
  @Input()
  set nzData(value: any[]) {
    if (value) {
      const COLUMNS = this.columns;
      for (let i = 0; i < value.length; i++) {
        const ITEM = value[i];
        // 扩展属性
        if (this.nzShowExpand) {
          ITEM.children = ITEM.children || [];
          ITEM['STATE-EXPAND']  = false;
        }
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < COLUMNS.length; j++) {
          const ELEMENT = COLUMNS[j];
          // 逻辑运算并返回结果
          if (ELEMENT.logic) {
            ITEM[`VALUE-${ELEMENT.key}`] = ELEMENT.logic(ITEM, this.count(i), ITEM[ELEMENT.key]);
          }
          // 多层数据解析
          if (ELEMENT.key.indexOf('.') > -1) {
            const KEY = ELEMENT.key.split('.');
            let OBJECT = ITEM[KEY[0]];
            let VALUE = '';
            KEY.forEach((ele, index) => {
              if (index === 0) {
                OBJECT = ITEM[ele] || {};
              } else {
                VALUE = typeof OBJECT[ele] === 'string' && OBJECT[ele];
                OBJECT = typeof OBJECT[ele] !== 'undefined' ? OBJECT[ele] : {};
              }
            });
            ITEM[`MULTI-${ELEMENT.key}`] = VALUE;
          }
          // html模板文件解析
          if (ELEMENT.html) {
            ITEM[`TEMP-${ELEMENT.key}`] = ELEMENT.html[0];
            ITEM[`TEMP-is${ELEMENT.key}`] = typeof ELEMENT.html[1] === 'boolean' ? ELEMENT.html[1] : ELEMENT.html[1](ITEM);
          }
        }
      }
      this._nzData = value;
    }
  }
  get nzData(): any[] {
    if (this._nzData.length === 0 && (this.nzTotal > this.nzPageSize) && (this.nzTotal / this.nzPageSize) <= (this.nzListIndex - 1)) {
      this.nzListIndex = (this.nzListIndex - 1);
      this.pageIndexChange();
    }
    return this._nzData;
  }

  /**
   * 当前页码改版时的回调函数
   * @function nzPageIndexChange
   */
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  /**
   * 页数改变时的回调函数
   * @function nzPageSizeChange
   */
  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  /**
   * 当前页面展示数据改变的回调函数
   * @function nzCurrentPageDataChange
   */
  @Output() nzCurrentPageDataChange: EventEmitter<number> = new EventEmitter();
  /**
   * 页数改变时的回调函数
   * @function nzQueryParams
   */
  @Output() nzQueryParams: EventEmitter<any> = new EventEmitter();
  /* ---------- 展开属性 ---------- */
  /**
   * 父级索引
   * @type { Number }
   * @private
   */
  // tslint:disable-next-line: variable-name
  private _nzParentIndex: number;
  /**
   * 二级列表对象
   * @type { Object }
   */
  @Input()
  set nzChildren(value: Children) {
    if (value) {
      value.data.forEach( (item, index) => {
        this.columns.forEach( (colItem, colIndex) => {
          // 逻辑运算并返回结果
          if (colItem.logic) {
            // tslint:disable-next-line: max-line-length
            item[`VALUE-${colItem.key}`] = colItem.logic(item, this.count(index - this.nzPageIndex), item[colItem.key],
            this.nzData[this._nzParentIndex]['VALUE-index']);
            item[`VALUE-ParentIndex`] = this._nzParentIndex + 1 + this.nzPageIndex;
          }
          // html模板文件解析
          if (colItem.html) {
            // 需要展示的索引
            item[`TEMP-${colItem.key}`] = colItem.html[0];
            // 是否展示的判断
            item[`TEMP-is${colItem.key}`] = typeof colItem.html[1] === 'boolean' ? colItem.html[1] : colItem.html[1](item);
          }
        });
      });
      this.nzData[value.ParentIndex || this._nzParentIndex].children = value.data;
    }
  }
  /**
   * 是否显示展开按钮
   * @type { Boolean }
   */
  @Input() nzShowExpand = false;
  // @Input() nzExpand;
  /**
   * 当前展开按钮状态改变回调函数
   * @function nzExpandChange
   */
  @Output() nzExpandChange: EventEmitter<any> = new EventEmitter();

  /* ---------- 勾选属性 ---------- */
  /**
   * 全选状态
   * @type { Boolean }
   * @private
   */
  private allChecked = false;
  private allDisabled = false;
  /**
   * 选择样式触发状态
   * @type { Boolean }
   * @private
   */
  private indeterminate = false;
  /**
   * 显示数据
   * @type { Array<any> }
   * @private
   */
  private displayData = [];
  /**
   * 是否添加checkbox
   * @type { Boolean }
   */
  @Input() nzShowCheckbox = false;
  /**
   * 选择回调函数
   * @function nzPageCheckChange
   */
  @Output() nzPageCheckChange: EventEmitter<any> = new EventEmitter();
  // 构造函数
  constructor(
  ) {
    window.addEventListener('resize', () => {
      this.countHeight();
    });
  }
  popoverVisible = false;
  // 是否切换页码，如果是的话，不触发排序函数
  isPageChange = false;
  /**
   * 提升性能
   * @function trackByFn
   * @param { Number } index 索引
   * @param { Object } item 当前对象
   * @returns { Number } 索引
   */
  trackByFn(index, item): void {
    return index; // or item.id
  }

  /**
   * 初始化
   * @function ngOnInit
   */
  ngOnInit(): void {
    this.colspan = this.columns.length + ( this.nzShowExpand ? 1 : 0 ) + ( this.nzShowCheckbox ? 1 : 0);
    this.scrollX = this.isScrollX && this.nzScroll.x ? this.nzScroll.x : 0;
    this.countScroll();
    this.countHeight();

  }
  // 计算宽度
  countScroll(): void {
    if (this.scrollX === 0) {
      this.dynamicScroll = { y: this.scrollY + 'px', x: 0 };
    } else {
      this.dynamicScroll = { y: this.scrollY + 'px', x: this.scrollX + 'px' };
    }
  }
  /**
   * 提醒文本处理
   * @function warn
   * @param { Number } name 名称
   * @param { Object } text 动作语句
   * @returns { String }
   * @private
   */
  private warn(name, text): string {
    name = name || '';
    return `确认要${text} "${name.length > 20 ? name.substring(0, 20) + '...' : name }" 吗?`;
  }
  /**
   * 计算table高度
   * @function countHeight
   */
  countHeight(): void {
    if (this.isHeight) {
      setTimeout(() => {
        if (document.getElementById('NGTABLES')) {
          const PAGE_SIZE = getPageSize();
          const OFFSET_TOP = document.getElementById('NGTABLES').offsetTop;
          const TABLE_BODY = document.getElementsByClassName('ant-table-body')[0];
          if (TABLE_BODY) {
            this.scrollY = (PAGE_SIZE.WinH - OFFSET_TOP - (this.nzShowPagination ? 102 : 62));
            // tslint:disable-next-line: no-string-literal
            // TABLE_BODY['style']['height'] = (PAGE_SIZE.WinH - OFFSET_TOP - 99 - 40 - (this.nzShowPagination ? 40 : 0)) + 'px';
            // 处理固定列切换时样式显示没有阴影问题
            // tslint:disable-next-line: no-string-literal
            TABLE_BODY['scrollLeft'] = 1;
          }
        }
        this.countScroll();
      }, 0);
    } else {
      setTimeout(() => {
        const TABLE_BODY = document.querySelector('#' + this.id + ' .ant-table-body');
        if (this.id && TABLE_BODY) {
          // const TABLE_BODY = document.getElementsByClassName('ant-table-body')[0];
          // tslint:disable-next-line: no-string-literal
          // TABLE_BODY['style']['height'] = (this.scrollY - 150) + 'px';
          this.countScroll();
        }
      }, 100);
    }
  }

  /**
   * 计算列表数据索引
   * @function count
   * @param { Number } index 当前数据索引
   * @returns { Number } 索引
   * @private
   */
  private count(index): number {
    return ((this.nzPageIndex < 0 ? 0 : this.nzPageIndex) + index + 1);
  }

  /**
   * 操作按钮禁用逻辑
   * @function disabled
   * @param { Object } value 表头对象
   * @param { Object } trItme 当初操作对象
   * @returns { Boolean }
   * @private
   */
  private disabled(value, trItme): boolean {
    return value.disabled ? value.disabled(trItme) : null ;
  }
  /**
   * 操作按钮隐藏逻辑
   * @function hide
   * @param { Object } value 表头对象
   * @param { Object } trItme 当初操作对象
   * @returns { Boolean }
   * @private
   */
  private hide(value, trItme): boolean {
    return value.hide ? value.hide(trItme) : false;
  }
  /**
   * 当前页码改版时的回调函数
   * @function pageIndexChange
   */
  pageIndexChange(): void {

    setTimeout(() => {
      this.nzPageIndex = this.nzTotal === 0 ? 0 : ((this.nzListIndex - 1) * this.nzPageSize);
      if (this.pageChangeStatus) {
        this.nzPageIndexChange.emit(this.nzPageIndex);
        this.isPageChange = true;

      } else {
        this.pageChangeStatus = true;
        this.isPageChange = false;

      }
    }, 1);
  }
  /**
   * 页数改变时的回调函数
   * @function PageSizeChange
   */
  PageSizeChange(): void {
    // 初始化到首页
    this.pageChangeStatus = false;
    this.nzPageSizeChange.emit(this.nzPageSize);
    setTimeout(() => {
      this.pageChangeStatus = true;
    }, 200);
  }
  /**
   * 当前页面展示数据改变的回调函数
   * @function currentPageDataChange
   * @param { Object } $event 当初操作对象
   * @private
   */
  currentPageDataChange($event): void {
    this.displayData = $event;
    this.checkedChange();
  }
  /**
   * 当前页面点击排序后展示数据改变的回调函数
   * @function onQueryParamsChange
   * @param { NzTableQueryParams }
   * { // NzTableQueryParams
   * pageIndex: number;
   * pageSize: number;
   * sort: Array<{ key: string; value: 'ascend' | 'descend' | null }>;
   * filter: Array<{ key: string; value: any | any[] }>;
   * }
   * @private
   */
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { sort } = params;
    const currentSort = sort.find(item => item.value !== null);
    if (!this.isPageChange || currentSort) {
      this.nzQueryParams.emit(currentSort);
    }
  }
  /* ---------- 选择 ---------- */
  /**
   * 选择回调函数
   * @function checkedChange
   * @private
   */
  private checkedChange(): void  {
    const allChecked = this.displayData.filter((value) =>
      value.checked
    );
    this.refreshStatus();
    this.nzPageCheckChange.emit(allChecked);
    const allDisabled = this.displayData.filter((value) =>
      value.disabled
    );
  }

  /**
   * 全选处理
   * @function checkAll
   * @param { Boolean } value 是否全选
   * @private
   */
  private checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.checkedChange();
  }
  /**
   * 选择后刷新页面状态
   * @function refreshStatus
   * @private
   */
  private refreshStatus(): void {
    const CHECKED = this.displayData.filter(value => !value.disabled);
    if (CHECKED.length) {
      const ALL_CHECKED = CHECKED.every(value => value.checked === true);
      this.allChecked = ALL_CHECKED;
      const ALL_UNCHECKED = CHECKED.every(value => !value.checked);
      this.indeterminate = (!ALL_CHECKED) && (!ALL_UNCHECKED);
    }
  }
  /**
   * 展开列表触发回调
   * @function collapse
   * @param { Object } array 已有的二级列表数据
   * @param { Object } data 父级列表数据
   * @param { Number } index 父级索引
   * @param { Boolean } state 展开状态
   * @private
   */
  private collapse(array, data, index, state: boolean): void {
    if (state) {
      this.nzExpandChange.emit({data, index});
      this._nzParentIndex = index;
    }
  }

  /**
   * 返回处理结果显示值
   * @function evaluation
   * @param { Object } trItme 当前对象
   * @param { Object } colItme 表头对象
   * @param { Boolean? } Sub 是否是子集
   * @private
   */
  private evaluation(trItme, colItme, Sub?): string  {
    if (Sub && trItme['VALUE-index'] && colItme.key === 'index') {
      return trItme['VALUE-ParentIndex'] + '-' + trItme['VALUE-index'];
    }

    return trItme['VALUE-' + colItme.key];
  }
  /**
   * 匹配值计算
   * @function evaluation
   * @param { Object } trItme 当前对象
   * @param { Object } render 表头对象
   */
  // match(trItme, render) {
  //   let RESULT = false;
  //   // render.value.length > 1
  //   for (let i = 0; i < render.value[1].length; i++) {
  //     const ELEMENT = render.value[1][i];
  //     if (trItme[render.value[0]].indexOf(ELEMENT) > 0) {
  //       RESULT = true;
  //       break;
  //     }
  //   }
  //   return RESULT;
  // }

}
