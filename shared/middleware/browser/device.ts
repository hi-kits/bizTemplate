/**
 * 当前设备信息
 * @class Device
 * @version 0.0.1
 * @author by fico on 2018/08/14
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 检测设备信息，返回当前设备状态对象。
 */

export class Device {
  readonly device: {
    [x: string]: any,
  };
  init(callback): void {
    // 定义设备对象
    const UA = navigator.userAgent;
    const html = document.querySelector('html');
    const metaViewport = document.querySelector('meta[name="viewport"]');

    const android = UA.match(/(Android);?[\s\/]+([\d.]+)?/);
    const ipad = UA.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = UA.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && UA.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const iphoneX = iphone && window.screen.width === 375 && window.screen.height === 812;
    this.device.browse = this.device.ios = this.device.android = this.device.iphone = this.device.ipad = this.device.androidChrome = false;
    // Android
    if (android) {
      this.device.os = 'android';
      this.device.osVersion = android[2];
      this.device.android = true;
      this.device.androidChrome = UA.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      this.device.os = 'ios';
      this.device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      this.device.osVersion = iphone[2].replace(/_/g, '.');
      this.device.iphone = true;
      this.device.iphoneX = iphoneX;
    }
    if (ipad) {
      this.device.osVersion = ipad[2].replace(/_/g, '.');
      this.device.ipad = true;
    }
    if (ipod) {
      this.device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      this.device.iphone = true;
    }
    // iOS 8+ changed UA
    if (this.device.ios && this.device.osVersion && UA.indexOf('Version/') >= 0) {
      if (this.device.osVersion.split('.')[0] === '10') {
        this.device.osVersion = UA.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }
    // Webview
    this.device.webView = (iphone || ipad || ipod) && UA.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (this.device.os && this.device.os === 'ios') {
      const osVersionArr = this.device.osVersion.split('.');
      this.device.minimalUi = !this.device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
        metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // 检查状态栏和全屏幕应用程序模式
    this.device.needsStatusbarOverlay = function needsStatusbarOverlay(): boolean {
      if (this.device.webView && (window.innerWidth * window.innerHeight === window.screen.width * window.screen.height)) {
        // tslint:disable-next-line: no-string-literal
        if (this.device.iphoneX && (window['orientation'] === 90 || window['orientation'] === -90)) {
          return false;
        }
        return true;
      }
      return false;
    };
    this.device.statusbar = this.device.needsStatusbarOverlay();

    // 样式
    const classNames = [];
    // 像素比
    this.device.pixelRatio = window.devicePixelRatio || 1;
    classNames.push('PixelRatio' + Math.floor(this.device.pixelRatio));
    if (this.device.pixelRatio >= 2) {
      classNames.push('Retina');
    }
    // IOS 样式
    if (this.device.os) {
      classNames.push(this.device.os, this.device.os + '-' + this.device.osVersion.split('.')[0], this.device.os + '-' + this.device.osVersion.replace(/\./g, '-'));
      if (this.device.os === 'ios') {
        const major = parseInt(this.device.osVersion.split('.')[0], 10);
        for (let i = major - 1; i >= 6; i--) {
          classNames.push('iosGt' + i);
        }
      }
    }
    // 状态栏类
    if (this.device.statusBar) {
      classNames.push('WithStatusbarOverlay');
    } else {
      html.classList.remove('WithStatusbarOverlay');
    }
    // HTML添加样式
    classNames.forEach((className) => {
      html.classList.add(className);
    });
    // 浏览器检测
    this.device.browse = UA.indexOf('MSIE') >= 0 ? 'ie' :
      UA.indexOf('Firefox') >= 0 ? 'Firefox' :
        UA.indexOf('Chrome') >= 0 ? 'Chrome' :
          UA.indexOf('Edge') >= 0 ? 'Edge' :
            UA.indexOf('Opera') >= 0 ? 'Opera' :
              UA.indexOf('Safari') >= 0 ? 'Safari' :
                UA.indexOf('Netscape') >= 0 && ('Netscape');
    callback(this.device);
  }
}
