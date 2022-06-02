/**
 * 开发环境配置
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

// 本地测试窗口协议更改
const protocol = 'https:';

export const environment = {
  // 本地测试环境  文件路径
  publicBase: '/',
  production: false,
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
  // IS_TEST: true,
  // 热更新
  hmr: false,
  /** 本地测试环境  接口路径 */
  paths: {
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
    CON_SYN_SERVER_URL: protocol + '//syntest.haier.net',

    /*----------- 中台 ----------*/
    // 中台-搜索
    SERVER_URL_MPS: protocol + '//zj-yanshou.haier.net/',
  },
};
