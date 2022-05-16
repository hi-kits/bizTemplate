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
const YANSHOU = '//zj-yanshou.haier.net';
// 生产地址
const SHENGCHAN = '//zj.haier.net';
// 三翼鸟域名
const ORIGIN_SYN = window.location.protocol + (window.location.origin.indexOf('ys-zjrs') > -1 ? YANSHOU : '//syn.haier.net');
// 是否是预发域名
const RELEASE = window.location.href.indexOf('haier.net/release') > -1;
// 运营平台域名
const ORIGIN = window.location.protocol + (window.location.origin.indexOf('ys-zjrs') > -1 ?
  YANSHOU : !RELEASE ? SHENGCHAN : '//zj-pre-release.haier.net');
window['PATHS'] = window['PATHS'] || {};
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
    // 接口域名
    SERVER_URL: window['PATHS'].SERVER_URL || ORIGIN + '/zjm/',
    // 老接口域名
    SERVER_URL_OLD: window['PATHS'].SERVER_URL_OLD || ORIGIN + '/',
    // 无网关接口域名
    SERVER_URL_NO_GATEWAY: window['PATHS'].SERVER_URL_NO_GATEWAY || ORIGIN + '/',
    // 三翼鸟接口域名
    SERVER_URL_SYN: window['PATHS'].SERVER_URL_SYN || ORIGIN + '/zjm/syn/',
    // 三翼鸟接口域名-内容平台
    SERVER_URL_SYN1: window['PATHS'].SERVER_URL_SYN || ORIGIN + '/zjm/',
    // 东南亚接口域名
    SERVER_URL_SCORD: window['PATHS'].SERVER_URL_SCORD || 'https://uhome-sea.haieriot.net/',
    // 星月系统接口域名
    SERVER_URL_NEBULA: window['PATHS'].SERVER_URL_NEBULA || ORIGIN_SYN + '/nebula/',
    // 星云系统-内容发布接口域名
    SERVER_URL_NEBULA_GW: window.location.origin.indexOf('ys-zjrs') > -1 ? window['PATHS'].SERVER_URL_NEBULA_GW : ORIGIN_SYN + '/nebula-gw/',
    // 一站式发布平台接口
    SERVER_URL_ONESTOP: window['PATHS'].SERVER_URL_ONESTOP || ORIGIN + '/synms/upm/',
    // 崩溃日志接口地址
    SERVER_URL_PERFA: window['PATHS'].SERVER_URL_PERFA || ORIGIN + '/synms/synlog/crash/',
    // 一站式发布平台接口-多维监控.崩溃日志
    SERVER_URL_MONITOR: window['PATHS'].SERVER_URL_MONITOR || ORIGIN + '/synms/'

  },
};


