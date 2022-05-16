/**
 * 定义select选项
 */
export type ParamsVal = {
    [x: string]: any;
    /** 选项显示名称 */
    name?: string;
    /** 选项value */
    code?: string | number;
    /** 隐藏选项 */
    disabled?: boolean;
}[] & { INDEX?: any };
type ParamsVals<T> = {
    [P in keyof T]: T[P];
};

export interface Params {
    [x: string]: ParamsVal;
}
/**
 * 定义项目信息
 */
export interface AppInfo {
    readonly PAGE_ID: string;
    readonly TITLE: string;
    readonly IS_VALIDATOR?: boolean;
}
