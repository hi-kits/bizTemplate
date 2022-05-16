/**
 * Scroll 库
 * @param Object position 定位（只支持Y轴）
 * @param Number delay 单位毫秒 default 200
 * @param Number speed 单位毫秒 default 10
 * 误差：滚动距离越短误差越小
 */
export class Scroll {
  private to(Element, options: { left, top, duration, easing}, callback?: () => void): void {
    let currentTop;
    let currentLeft;
    let maxTop;
    let maxLeft;
    let newTop;
    let newLeft;
    let scrollTop;
    let scrollLeft;
    let animateTop = options.top > 0 || options.top === 0;
    let animateLeft = options.left > 0 || options.left === 0;
    if (typeof options.easing === 'undefined') {
      options.easing = 'swing';
    }
    if (animateTop) {
      currentTop = Element.scrollTop;
      if (!options.duration) {
        Element.scrollTop = top;
      }
    }
    if (animateLeft) {
      currentLeft = Element.scrollLeft;
      if (!options.duration) {
        Element.scrollLeft = options.left;
      }
    }
    if (!options.duration) {
      options.duration = 300;
    }
    if (animateTop) {
      maxTop = Element.scrollHeight - Element.offsetHeight;
      newTop = Math.max(Math.min(options.top, maxTop), 0);
    }
    if (animateLeft) {
      maxLeft = Element.scrollWidth - Element.offsetWidth;
      newLeft = Math.max(Math.min(options.left, maxLeft), 0);
    }
    let startTime = null;
    if (animateTop && newTop === currentTop) { animateTop = false; }
    if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
    // tslint:disable-next-line:cyclomatic-complexity
    const render = (time) => {
      if (time === undefined) {
        // tslint:disable-next-line:no-parameter-reassignment
        time = +(new Date());
      }
      if (startTime === null) {
        startTime = time;
      }
      let done;
      const progress = Math.max(Math.min((time - startTime) / options.duration, 1), 0);
      const easeProgress = options.easing === 'linear' ? progress : (0.5 - Math.cos(progress * Math.PI) / 2);
      if (animateTop) { scrollTop = currentTop + (easeProgress * (newTop - currentTop)); }
      if (animateLeft) { scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft)); }
      if (animateTop && newTop > currentTop && scrollTop >= newTop) {
        Element.scrollTop = newTop;
        done = true;
      }
      if (animateTop && newTop < currentTop && scrollTop <= newTop) {
        Element.scrollTop = newTop;
        done = true;
      }
      if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
        Element.scrollLeft = newLeft;
        done = true;
      }
      if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
        Element.scrollLeft = newLeft;
        done = true;
      }
      if (done) {
        if (callback) {
          callback();
        }
        window.cancelAnimationFrame(0);
        return;
      }
      if (animateTop) { Element.scrollTop = scrollTop; }
      if (animateLeft) { Element.scrollLeft = scrollLeft; }
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);
  }
  /**
   * scrollTop 滚动到顶部
   * @param Element 需要滚动的元素
   * @param options 滚动的参数
   * @param options.top 滚动到顶部的位置
   * @param options.duration 滚动到顶部的时间
   * @param options.easing 滚动到顶部的缓动逻辑
   * @param callback 滚动到顶部完成后的回调
   */
  top(Element, options: { top, duration?, easing?}, callback?): void {
    setTimeout(() => {
      this.to(Element, { left: undefined, top: options.top, duration: options.duration, easing: options.easing }, callback);
    }, 0);
  }
  /**
   * scrollLeft 滚动到左侧
   * @param Element 需要滚动的元素
   * @param options 滚动的参数
   * @param options.top 滚动到左侧的位置
   * @param options.duration 滚动到左侧的时间
   * @param options.easing 滚动到左侧的缓动逻辑
   * @param callback 滚动到左侧完成后的回调
   */
  left(Element, options: { left, duration?, easing?}, callback?): void {
    setTimeout(() => {
      this.to(Element, { left: options.left, top: undefined, duration: options.duration, easing: options.easing }, callback);
    }, 0);
  }
}
