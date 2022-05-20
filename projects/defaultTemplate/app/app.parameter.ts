/**
 * 项目参数
 * @class: AppParameter
 * @version: 0.0.1
 * @date: 2018/11/05
 * @author: fico
 * @return: string
 * @description:
 */
import { Injectable } from '@angular/core';
import { Params } from '@int/params';

interface AppInfo {
    readonly PAGE_ID: string;
    readonly TITLE: string;
    readonly IS_VALIDATOR?: boolean;
}


@Injectable({
    providedIn: 'root',
})
export class AppParameter {
    [x: string]: any;
    // 信息
    readonly info: AppInfo = {
        // 页面标识
        PAGE_ID: 'APPPageAudit',
        // 标题
        TITLE: 'APP页面审核',
        // 是否需要验证权限
        IS_VALIDATOR: true
    };
    // 当前操作项对象
    readonly currentItem = {
        view: {},
        viewPage: {
            index : 0, // 页面索引
            size : 20, // 页面数据条数
        },
    };


    /* ------------ select选项 ------------ */
    readonly option: Params = {
        // 页面类型
        pageType: [
            {name: '服务', code: '0'},
            {name: '底TAB', code: '1'}
        ],
        // 审核状态
        reviewStatus: [
            {name: '审核', code: 0},
            {name: '审核中', code: 1},
            {name: '已通过', code: 2},
            {name: '未通过', code: 3}
        ],
        // 审核状态
        auditStatus: [
            {name: '全部', code: 0},
            {name: '待审核', code: 1},
            {name: '已通过', code: 2},
            {name: '未通过', code: 3}
        ],
    };

}
