// 定义子集
export interface Children {
    ParentIndex: number;
    data: any[];
}
// 定义列表页面
export interface ListPage {
    /** 列表数据 */
    tableData: any[];
    /** 表数据格式 */
    columns: any;
    /** 标题 */
    title: any[] | string;
    /** 页面索引 */
    PageIndex: number;
    /** 当前页 */
    curPage?: number;
    /** 页面数据分页 */
    PageSize: number;
    /** 页面数据总数 */
    PageTotal: number;
    /** 查询数据 */
    searchObj: any;
    /** loading 加载数据时状态 */
    loading: boolean;
    /** 当前父元素 */
    _ParentItem?: object;
    /** 父组件中获得子组件的引用 */
    Table: any;
    /** 显示多选 */
    showCheckbox?: boolean;
    showCheckboxList?: any[];
    /** 折叠 */
    ShowExpand?: boolean;
    /** 折叠展开时的子集对象 */
    children?: Children;
    /** 折叠 or 展开时的发生变化时的回调 */
    expandChange?(ev: any): void;
    /** 页面改变状态 */
    pageStatus: boolean;
    /** 是否显示搜索框 */
    isShowQuery?: boolean;
    /** 展开/隐藏查询表单发生变化时的回调 */
    foldChange?(e: any):void;
    /** 查询 */
    query?(ev?): void;
    /** 对查询结果进行重置 */
    reset?(): void;
    /** 当前页码改版时的回调函数 */
    pageIndexChange(ev: any): void;
    /** 页数改变时的回调函数 */
    pageSizeChange(ev: any): void;
    /** 列表选择时的回调 */
    pageCheckChange?(ev: any): void;
    /** 页面数据变化 */
    pageDataChange(): void;
    /** 删除 */
    // delete?(id: any): void;
    delete?(name: string, params: object): void;
    /** 页面被激活时回调 */
    onDeactivate?(modal: any): void;
}

// 定义添加编辑
export interface AddEdit {
    /** 视图类型
     * @ 1 新增
     * @ 2 编辑
     */
    type: any;
    /** 是否同步 - 修改后是否更新列表 */
    isSync: boolean;
    /** 页面标题 */
    title: string;
    /** 当前对象 */
    _CurrentItem: object;
    /** @deprecated 已废弃，请使用 modifyForm 代替 */
    addEditForm?: any;
    /** 表单数据 */
    modifyForm: any;
    /** 表单数据组 */
    formList;
    /** 创建表单元素 */
    createForm(): void;
    /** 保存 */
    submitForm(callback?): void;
}

// 定义查找
export interface Lookup {
    /** 查询数据 */
    SearchForm: any;
    /** 查找信息 */
    searchInfo: boolean;
    /** 查找时的回调 */
    searchSubmitChange: any;
    /** 日历控件禁用状态 */
    nzDisabledStatus?: boolean;
    /* 日历控件禁用状态 */
    // nzDisabledStatusOther?: boolean;
    /** 时间范围 */
    rangeDates?: any;
    /** 时间发生变化的回调 */
    change?(choice: any, type?): void;
    /** 点击确定按钮的回调 */
    onOk?(): void;
    /** 创建表单元素 */
    createForm(): void;
    /** 对查询结果进行重置 */
    reset?(): void;
    /** 提交表单函数 */
    submit(): void;
}

