/**
 * 生产环境配置
 * environment
 * @version 0.0.1
 * @author by fico on 2018/10/29
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 *      当前环境中的文件内容将在构建期间重写这些文件
 *      构建系统默认使用 `environment.ts` 开发环境
 *      `ng build --env=prod` 会使用 `environment.prod.ts` 来替代
 *      该环境映射的列表，可以在 `.angular-cli.json` 中找到
 */
// 验收地址
const protocol = 'window.location.protocol';
// 是否是预发环境
var IS_RELEASE = window.location.href.indexOf('haier.net/release') > -1;
// 是否验收环境
var IS_YS = window.location.origin.indexOf('ys-zjrs') > -1;
let paths = {};
/** 生产环境  接口路径 */
if (IS_YS) {
  paths = {
    /*----------- 通用接口配置 ----------*/
    // 运营平台接口域名
    // 无网关接口域名
    // 一站式发布平台接口
    // 三翼鸟接口域名
    // 内容发布平台-智家
    SERVER_URL: protocol + '//zj-yanshou.haier.net/',
    /*----------- 东南亚 ----------*/
    // 东南亚接口域名
    SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',
    /*----------- 星云系统 ----------*/
    // 星云系统接口域名
    SERVER_URL_NEBULA: protocol + '//zj-yanshou.haier.net/',
    /*----------- 内容发布 ----------*/
    // 内容发布平台接口-三翼鸟
    CON_SYN_SERVER_URL: protocol + '//syntest.haier.net/',

    /*----------- 中台 ----------*/
    // 中台-搜索
    SERVER_URL_MPS: protocol + '//zj-yanshou.haier.net/',
  };
} else if (IS_RELEASE) {
  paths = {
    /*----------- 通用接口配置 ----------*/
    // 运营平台接口域名
    // 无网关接口域名
    // 一站式发布平台接口
    // 三翼鸟接口域名
    // 内容发布平台-智家
    SERVER_URL: protocol + '//zj-pre-release.haier.net/',
    /*----------- 东南亚 ----------*/
    // 东南亚接口域名
    SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',
    /*----------- 星云系统 ----------*/
    // 星云系统接口域名
    SERVER_URL_NEBULA: protocol + '//zj-pre-release.haier.net/',
    /*----------- 内容发布 ----------*/
    // 内容发布平台接口-三翼鸟
    CON_SYN_SERVER_URL: protocol + '//zj-pre-release.haier.net/',
    /*----------- 中台 ----------*/
    // 中台-搜索
    SERVER_URL_MPS: protocol + '//mps.haiersmarthomes.com/',
  };
} else {
  paths = {
    /*----------- 通用接口配置 ----------*/
    // 运营平台接口域名
    // 无网关接口域名
    // 一站式发布平台接口
    // 三翼鸟接口域名
    // 内容发布平台-智家
    SERVER_URL: protocol + '//zj.haier.net/',
    /*----------- 东南亚 ----------*/
    // 东南亚接口域名
    SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',

    /*----------- 星云系统 ----------*/
    // 星云系统接口域名
    SERVER_URL_NEBULA: protocol + '//syn.haier.net/',

    /*----------- 内容发布 ----------*/
    // 内容发布平台接口-三翼鸟
    CON_SYN_SERVER_URL: protocol + '//syn.haier.net/',

    /*----------- 中台 ----------*/
    // 中台-搜索
    SERVER_URL_MPS: protocol + '//mps.haiersmarthomes.com/',
  };
}

window['PATHS'] = window['PATHS'] || paths;
export const environment = {
  publicBase: '/',
  production: true,
  /**
   *  智家（F） or 三翼鸟（T）
   */
  _origin: false,
  get origin(): boolean {
    return this._origin;
  },
  set origin(value) {
    this._origin = value;
    if (value) {
      const meta = document.createElement('meta');
      meta.content = 'upgrade-insecure-requests';
      meta.httpEquiv = 'Content-Security-Policy';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  },
  // 是否是测试
  IS_TEST: false,
  // 热更新
  hmr: false,
  /** 生产环境  接口路径 */
  paths: {
    /*----------- 通用接口配置 ----------*/
    // 运营平台接口域名
    // 无网关接口域名
    // 一站式发布平台接口
    // 三翼鸟接口域名
    // 内容发布平台-智家
    SERVER_URL: window['PATHS'].SERVER_URL,
    /*----------- 东南亚 ----------*/
    // 东南亚接口域名
    SERVER_URL_SCORD: window['PATHS'].SERVER_URL_SCORD,

    /*----------- 星云系统 ----------*/
    // 星云系统接口域名
    SERVER_URL_NEBULA: window['PATHS'].SERVER_URL_NEBULA,

    /*----------- 内容发布 ----------*/
    // 内容发布平台接口-三翼鸟
    CON_SYN_SERVER_URL: window['PATHS'].CON_SYN_SERVER_URL,

    /*----------- 中台 ----------*/
    // 中台-搜索
    SERVER_URL_MPS: window['PATHS'].SERVER_URL_MPS,
  },
};
