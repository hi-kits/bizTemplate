import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

// 定义选项
interface Obj {
    [x: string]: any;
}
type OperationType = 'delete' | 'sub' | 'switch' | 'popover' | 'match' | 'remind' | 'custom';

interface OperationS {
    /**  名称 */
    name: string | {[x: string]:any};
    /** 显示key
     * @ type 为 'delete' / 'switch' 必须
    */
    key?: string;
    /** 展示类型  非必须
     * @ type 为 'delete' / 'switch' 必须添加 key
     * @delete 删除
     * @sub 子列表操作时显示
     * @switch 开关方式
     * @popover 气泡卡片方式
     * @match 匹配某个值是否存在
     * @remind 提醒方式
     * @custom 自定义 - 暂时无效
    */
    type?: OperationType;
    /** 逻辑运算
     * @record 当前操作的对象
    */
    logic?(record: Obj): void;
    /** 点击事件
     * @record 当前操作的对象
    */
    call(record: Obj): void;
    /** type 为 'popover' 必须
     * @title string
     * @contentTemplate string
     */
    option?: {
        title: string;
        contentTemplate: string;
    };
    /** 自定义样式 */
    class?: string;
    /** 是否禁用
     * @record 当前操作的对象
     * @text 当前对象key的值
     * @return 返回结果为 true or null
     */
    disabled?(record: Obj, text: string): void;
    /** 是否隐藏
     * @record 当前操作的对象
     * @text 当前对象key的值
     * @return 返回结果为 true or false
     */
    hide?(record: Obj, text: string): void;
    /**
     * @ type 为 'switch' / 'remind' 必须
    */
    value?: string;
    /**
     * @ record 当前操作的对象
     * @ type 为 'remind' 时value和message必须且只能选一个
    */
    message?(record: Obj): void;
    /**
     * @ type 为 'switch' 时是否添加popover提示
     */
    disPopConfirm?: boolean;
}
// 权限控制显示
export interface Power {
    [x: string]: {
        type: boolean;
        code?: string;
        name?: string;
        // content?: string;
        bind?: OperationS;
    };
}

export interface Operation {
    [x: string]: OperationS;
}

type RowKeyType = 'index' | 'operation' | string;
// 表数据格式
export interface Rows {
    [index:number]: {
        /** th中显示的标题 */
        title: string,
        /** 需要显示的key */
        key: RowKeyType,
        /** 在表格中显示的宽度 */
        width?: string,
        /** 逻辑运算
         * @record  当前操作的对象
         * @index 当前对象的索引
         * @text 当前对象key的值
         * @return 需要在页面上显示的值
         */
        logic?(record: any, index: number, text: string): void;
        /** 呈现菜单 */
        render?: {
            [index: number]: OperationS
        };
        /** 隐藏
         * @ 展示最多1行，提供文本tooltip展示
        */
        hide?: boolean;
        /** 展示行数
         * @ 为hide时可以设置
        */
        line?: number;
        /** 页面呈现
         * @ 载入html文档元素
         * number  <app-table /> 中 template 熟悉的数组索引
         * boolean 是否显示自定义dom
        */
        html?: [number, ((r: any) => boolean) | boolean];
        // 当前排序状态，可双向绑定
        sortOrder?: NzTableSortOrder | null;
        // 排序函数，前端排序使用一个函数(参考 Array.sort 的 compareFunction)，服务端排序时传入 true
        sortFn?: NzTableSortFn | true;
        // 支持的排序方式，取值为 'ascend', 'descend', null
        sortDirections?: NzTableSortOrder[];
    };
}


