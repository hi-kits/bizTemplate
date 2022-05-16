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
    SERVER_URL_OLD: 'https://zj.haier.net/',
    SERVER_URL_NO_GATEWAY: window.location.protocol + '//zj-yanshou.haier.net/',
    SERVER_URL:  window.location.protocol + '//zj-yanshou.haier.net/zjm/',
    SERVER_URL_SYN: window.location.protocol + '//zj-yanshou.haier.net/zjm/syn/',
    // 三翼鸟接口域名-内容平台
    SERVER_URL_SYN1: window.location.protocol + '//zj-yanshou.haier.net/zjm/',
    SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',
    SERVER_URL_NEBULA: 'https://zj-yanshou.haier.net/nebula/',
    SERVER_URL_ONESTOP: 'http://zj-yanshou.haier.net/synms/upm/',
    SERVER_URL_MONITOR: 'http://zj-yanshou.haier.net/synms/',
    SERVER_URL_NEBULA_GW: 'https://zj-yanshou.haier.net/nebula-gw/',
    SERVER_URL_PERFA: 'http://zj-yanshou.haier.net/synms/synlog/crash/',
  },
};
