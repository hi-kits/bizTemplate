/**
 * 列表页面混入
 * @class ViewIndexMixin
 * @version 0.0.1
 * @author by fico on 2020/09/10
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
// 页面接口
import { Rows } from '@int/tabular';
import { ListPage } from '@int/page';

export class ViewIndexMixin implements ListPage {
    // ------------------ 构造函数 ------------------
    constructor(viewAction) {
        this.ViewAction = viewAction;
    }

    // ------------------ 参数 ------------------
    /** 视图类型
     * @ 1 新增
     * @ 2 编辑
     */
    type;
    /** 列表数据 */
    private _tableData: any[];
    public get tableData(): any[] {
        return this._tableData;
    }
    public set tableData(value: any[]) {
        this._tableData = value;
    }
    /** 表数据格式 */
    columns: Rows;
    /** 标题 */
    title: any[] | string;
    /** 表单 */
    Table: any;
    /** 是否显示 table */
    isTable = false;
    /** 页面索引 */
    private _PageIndex = 0;
    public get PageIndex(): number {
        return this._PageIndex;
    }
    public set PageIndex(value: number) {
        this._PageIndex = value;
    }
    /** 页面数据分页 */
    private _PageSize = 20;
    public get PageSize(): number {
        return this._PageSize;
    }
    public set PageSize(value: number) {
        this._PageSize = value;
    }
    /** 页面数据总数 */
    private _PageTotal;
    public get PageTotal(): number {
        return this._PageTotal;
    }
    public set PageTotal(value: number) {
        this._PageTotal = value;
    }
    /** 是否显示搜索框 */
    isShowQuery = false;
    /** 查询数据 */
    searchObj: any;
    /** loading 加载数据时状态 */
    loading = true;
    /** 页面改变状态 */
    private _pageStatus = false;
    public get pageStatus(): boolean {
        return this._pageStatus;
    }
    public set pageStatus(value) {
        setTimeout(() => {
            this._pageStatus = value;
        }, 1);
    }
    /** 当前父元素 */
    _ParentItem;
    /** 页面事件 */
    private ViewAction;
    /** 查询提交 */
    SearchSubmit;

    // ------------------ 自定义函数 ------------------
    /** 计数高度
     * time 延迟时间（毫秒）
     */
    countHeight(time?: number): void {
        setTimeout(() => {
          const iframeHeight = document.body.scrollHeight;
          window.parent.postMessage({ type: 'changeFrameSize', payload: { height: iframeHeight} }, '*');
        }, time || 0);
    }
    /** 页面数据变化 */
    pageDataChange(name?: string, options?: any, callback?: (result) => void): void {
        this.loading = true;
        // 判断参数类型
        if (typeof options === 'function') {
            callback = arguments[1];
            options = undefined;
        }
        const defaults = {
            index: this.PageIndex >= this.PageSize ? (this.PageIndex / this.PageSize) + 1 : this.PageIndex + 1,
            pageSize: this.PageSize,
            searchObj: this.searchObj
        };
        options = options || {};
        // tslint:disable-next-line: forin
        for (const def in defaults) {
            if (typeof options[def] === 'undefined') {
                options[def] = defaults[def];
            }
        }
        this.ViewAction.get(name, options, (ResultData) => {
            // 设置 loading 状态
            this.loading = false;
            // 设置页面状态
            this.pageStatus = true;
            // 设置表单数据
            this.tableData = ResultData?.result?.records;
            // 设置表单总数
            this.PageTotal = ResultData?.result?.total;
            // 如果有回调，返回回调数据
            if (callback) {
                callback(ResultData);
            }
        }).finally(() => {
            // 请求结束后处理loading
            this.loading = false;
        });
    }
    /** 删除 */
    delete(name: string, params: object): void {
        this.ViewAction.set(name, params, () => {
            this.pageDataChange();
        });
    }
    /** 当前页码改版时的回调函数 */
    pageIndexChange(): void {
        if (this.pageStatus) {
            this.pageDataChange();
        }
    }
    /** 页数改变时的回调函数 */
    pageSizeChange(): void {
        if (this.pageStatus) {
            this.PageIndex = 0;
            this.pageDataChange();
        }
    }
    /** 列表选择时的回调 */
    pageCheckChange(ev): void {
        console.log(ev);
    }

    /** 展开/隐藏查询表单发生变化时的回调 */
    foldChange(ev): void {
        this.isShowQuery = ev;
        this.Table.countHeight();
    }

    /** 查询 */
    query(): void {
        this.SearchSubmit.submit();
    }

    /** 对查询结果进行重置 */
    reset(): void {
        this.SearchSubmit.reset();
    }
    /** 查询提交 */
    searchSubmitChange(): void {
        this.searchObj = { ...this.searchObj, ...this.SearchSubmit.searchInfo };
        this.PageIndex = 0;
        // this.PageSize = 20;
        this.pageDataChange();
    }
    /** 页面被激活时回调 */
    onDeactivate(modal): void {
        if (modal.isSync) {
            this.pageDataChange();
        }
    }
}
