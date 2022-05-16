/**
 * 标签逻辑服务
 * @class HttpServices
 * @version 0.0.1
 * @author by fico on 2018/06/07
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable } from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 动态开始时间

const DynamicStartTimeType = [
    { name: '前1天', code: '1' },
    { name: '前2天', code: '2' },
    { name: '前3天', code: '3' },
    { name: '前4天', code: '4' },
    { name: '前5天', code: '5' },
    { name: '前6天', code: '6' },
    { name: '前7天', code: '7' },
    { name: '前30天', code: '30' },
];
// 动态结束时间
const DynamicEndTimeType = [
    { name: '今天', code: '0' },
    { name: '前1天', code: '1' },
    { name: '前2天', code: '2' },
    { name: '前3天', code: '3' },
    { name: '前4天', code: '4' },
    { name: '前5天', code: '5' },
    { name: '前6天', code: '6' },
    { name: '前29天', code: '29' },
];
@Injectable({
    providedIn: 'root',
})
export class TagLogicServices {
    constructor(
        private httpServices: HttpServices,
    ) { }
    /** 动态开始时间 */
    DynamicStartTimeType = DynamicStartTimeType;
    /** 动态结束时间 */
    DynamicEndTimeType = DynamicEndTimeType;

    /** 逻辑类型 */
    TypeName = {
        terminal_os: '终端基础标签-系统',
        terminal_ver: '终端基础标签-版本',
        area: '终端基础标签-地区',
        channel_first_cd: '终端基础标签-渠道包',
        binddev_lines: '智能设备标签-绑定网器种类-产业',
        user_status_cd: '用户活跃标签-生命周期状态',
        user_type_cd: '用户活跃标签-用户类型',
        user_reg_date: '用户活跃标签-注册时间/首次活跃时间',
        actdate_last: '用户活跃标签-末次活跃时间',
        user_type_identity: '用户基础标签-用户身份',
        user_age: '用户基础标签-年龄',
        user_sex: '用户基础标签-性别',
        system: '用户基础标签-用户来源',
    };
    /** 计算名称
     * @ 传入需要处理的对象字段
     */
    tagName(options): string {
        if (options.type === '0') {
            return '动态时间段 / ' +
                (DynamicStartTimeType[options.startDay === '30' ? '7' : (options.startDay - 1)].name) +
                options.startTime + '-' +
                (DynamicEndTimeType[options.endDay === '29' ? '7' : options.endDay].name) + options.endTime;
        }
        return '固定时间段 / ' + options.startDay + ' ' + options.startTime + '-' + options.endDay + ' ' + options.endTime;
    }
    /**
     * 获取标签逻辑
     * @param String logicId 标签逻辑参数
     * @returns Promise<any> 返回Promise对象
     */
    async logicId(logicId): Promise<any> {
        return await new Promise((resolve, reject) => {
            this.get({ logicId }, (ResultData) => {
                if (ResultData.result) {
                    if (ResultData.result.details) {
                        ResultData.result.details.forEach((element, index) => {
                            let Name;
                            if (element.tagInfo) {
                                Name = element.tagInfo.name;
                            } else if (element.timeFrameInfo) {
                                Name = this.tagName(element.timeFrameInfo);
                            } else {
                                Name = element.areaTagInfo.provinceName + (element.areaTagInfo.cityName ? element.areaTagInfo.cityName : '');
                            }
                            element.details = (element.prefix === '0' ? '非' : '') +
                              (element.tagTitle || this.TypeName[element.tagType]) +
                              '：' +
                              Name + (ResultData.result.details.length !== (index + 1) ? (element.connector === '&' ? ' 与' : ' 或') : '');
                        });
                    }
                    resolve(ResultData.result);
                } else {
                    reject();

                }
            });
        });
    }
    /**
     * 请求
     * @param  Object  options:{logicId} 标签逻辑参数
     * @param  Function  callback 成功回调
     * @param  Function  error 失败回调
     * @inner
     * @returns  Promise<any>  返回Promise对象
     */
    private get(options: { logicId }, callback?: (r) => void, error?: (r) => void): Promise<any> {
        const HTTP_BODY = { ...options }; // 请求数据
        // 智家运营后台
        const paramUrl = 'shm/pushmsg/pushmsg/logicId'; // 参数url
        const url = environment.paths.SERVER_URL + paramUrl;
        // if (environment.origin === 1) {
        // 三翼鸟运营后台
        // paramUrl = 'synappbm/logicTag/logicId';
        // url = environment.paths.SYN_SERVER_URL + paramUrl;
        // }
        return this.httpServices.HTTP({
            name: 'logicId',
            method: 'POST', // 请求方式
            url, // 请求url
            paramUrl, // 参数url
            httpBody: HTTP_BODY, // 请求数据
            callback: callback || ((r) => { }),
            error: error || ((r) => { }),
            isIgnore: true // 是否忽略返回结果
        });
    }
}



