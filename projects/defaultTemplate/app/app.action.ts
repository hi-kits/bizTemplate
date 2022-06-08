/**
 * 请求
 * @class: ViewAction
 * @version: 0.0.1
 * @date: 2018/07/19
 * @author: fico
 * @description:
 * 对外提供 get 和 set 异步方法
 * 通过调用签名方法获取签名参数
 */
import { Injectable } from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 类型接口
import { HttpOption } from '@int/types';
// 消息
import { Message } from '@shared/modulesOptional/message/app.message';
// 对象转换
import { stringify } from '@mid/data/string';
// 删除字符串前后空格
import { Trim } from '@mid/data/trim';
// APP参数
import { AppParam } from '@user';

type GetName = 'wordsList'
  | 'carouselTypeList' 
  | 'regionList' 
  | 'dropList'  // 展示区域
  | 'queryChannelByTenant' // 发布渠道
  | 'listDetail';// 帮助文档列表
type SetName = 'batchOperate' | 'updateList' | 'batchSave' | 'updateSortField'; // 搜索词删除、修改、批量新增、排序


@Injectable()
export class ViewAction {
  // 请求参数
  param: object;

  constructor(
    private message: Message,
    private httpServices: HttpServices,
    private appParam: AppParam,
  ) { }

  // 请求
  private httpSend(options: HttpOption): Promise<any> {
    return this.httpServices.HTTP(options, (ResultData) => {
      if (ResultData.name.indexOf('Delete') > -1) {
        this.message.success('删除成功！');
      }
    }, (error) => {
      if (error.name !== 'msgTest') {
        this.message.warning(error.result.message !== '' ? error.result.message : '数据错误！');
      }
    });
  }

  // 获取数据
  get(name: GetName, options?: any, callback?: (r) => void, error?: () => void): Promise<any> {
    let HTTP_BODY = { ...options }; // 请求数据
    let URL = ''; // 请求url
    let TYPE = null; // 请求类型
    let PARAM_URL = ''; // 参数url
    let METHOD = 'POST'; // 请求方式
    // tslint:disable-next-line: no-string-literal
    const IS_IGNORE = false; // 是否忽略返回结果
    // 判断参数类型
    if (typeof options === 'function') {
      /* eslint-disable */
      callback = arguments[1];
      /* eslint-disable */
      error = arguments[2];
      options = undefined;
    }
    switch (name) {
      // 查询列表
      case 'wordsList':
        METHOD = 'GET';
        HTTP_BODY = {
          pageNo: options.index,
          pageSize: options.pageSize,
          ...options.searchObj
        };
        PARAM_URL = 'mpscommon/search/carouselword/v1/getPageList';
        break;
      // 搜索词类型
      case 'carouselTypeList':
        METHOD = 'GET';
        HTTP_BODY = {
          ...options
        };
        PARAM_URL = 'mpscommon/search/carouselword/v1/getCarouselTypeList';
        break;
      // 
      case 'regionList':
        METHOD = 'GET';
        TYPE = 'noLimit';
        HTTP_BODY = {
          ...options
        };
        PARAM_URL = 'mpscommon/search/carouselword/v1/getRegionList';
        break;
      // 
      case 'listDetail':
        METHOD = 'GET';
        HTTP_BODY = {
          ...options
        };
        PARAM_URL = 'mpscommon/search/carouselword/v1/getDetail';
        break;
      // 展示区域
      case 'dropList':
        METHOD = 'GET';
        HTTP_BODY = {
          ...options
        };
        PARAM_URL = 'mpscommon/showArea/dropList';
        break;
        // 发布渠道
      case 'queryChannelByTenant':
        METHOD = 'GET';
        HTTP_BODY = {
          ...options
        };
        PARAM_URL = 'mpscommon/v1/channel/queryChannelByTenant';
        break;
      default:
        return null;
    }
    URL = environment.paths.SERVER_URL_MPS + PARAM_URL;
    return this.httpSend({
      name,
      type: TYPE,
      method: METHOD,
      url: URL,
      paramUrl: PARAM_URL,
      httpBody: HTTP_BODY,
      /* eslint-disable */
      callback: callback || function () { },
      /* eslint-disable */
      error: error || function () { },
      isIgnore: IS_IGNORE
    });
  }

  // 提交数据
  set(name: SetName, options: any, callback?: (r) => void, error?: () => void): Promise<any> {
    const HTTP_BODY = { ...options }; // 请求数据
    let URL = ''; // 请求url
    let PARAM_URL = ''; // 参数url
    let METHOD = 'POST'; // 请求方式
    let IS_IGNORE = false; // 是否忽略返回结果
    switch (name) {
      // shortLink增删改查
      case 'batchOperate':
        IS_IGNORE = true;
        PARAM_URL = 'mpscommon/search/carouselword/v1/batchOperate';
        break;
      case 'updateList':
        IS_IGNORE = true;
        PARAM_URL = 'mpscommon/search/carouselword/v1/update';
        break;
      case 'batchSave':
        IS_IGNORE = true;
        PARAM_URL = 'mpscommon/search/carouselword/v1/batchSave';
        break;
      case 'updateSortField':
        IS_IGNORE = true;
        PARAM_URL = 'mpscommon/search/carouselword/v1/updateSortField';
        METHOD = 'get';
        break;
      default:
        return null;
    }
    URL = environment.paths.SERVER_URL_MPS + PARAM_URL;
    return this.httpSend({
      name,
      method: METHOD,
      url: URL,
      paramUrl: PARAM_URL,
      httpBody: HTTP_BODY,
      /* eslint-disable */
      callback: callback || function (): void { },
      /* eslint-disable */
      error: error || function (): void { },
      isIgnore: IS_IGNORE
    });
  }

}

