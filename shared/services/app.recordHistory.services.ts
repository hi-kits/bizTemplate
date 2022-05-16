/**
 * 路径缓存服务
 * @class ValidatorAction
 * @version 0.0.1
 * @author by hzb on 2021/06/20
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import {Router, NavigationEnd} from '@angular/router';
import {NgModule} from '@angular/core';

@NgModule({})
export class RecordHistoryModule {
  constructor(
    private readonly router: Router
  ) {
    this.initRouterWatcher();
    this.initPageActivatedWatcher();
  }

  historyStack: any = [];

  // 监听路由导航事件并记录
  initRouterWatcher(): void {
    this.router.events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          const { id, urlAfterRedirects: url } = e;
          const historyStack = this.historyStack;
          const currentRouter = this.router.getCurrentNavigation();

          if (currentRouter.trigger !== 'imperative') {
            historyStack.pop();
          }
          this.historyStack.push({ id, url });
        }
      });
  }

  // 将历史路由去重
  formatHistoryStack(): void {
    // 去除相邻的相同的history
    const historyStack = this.historyStack.reduce((stack, h) => {
      const len = stack.length;
      if (len === 0 || stack[len - 1].url !== h.url) {
        stack.push(h);
      }

      return stack;
    }, []);

    const length = historyStack.length;

    // 如果第一个和最后一个相同，则弹出第一个
    if (length > 1 && historyStack[0].url === historyStack[length - 1].url) {
      historyStack.shift();
    }

    // 去除history中重复的片段，例如A->B->A->B->C ==>  A->B->C

    this.historyStack = historyStack;
  }

  // 监听页面激活事件，重新建立历史导航
  initPageActivatedWatcher(): void {
    window.addEventListener('message', e => {
      if (e.data.type === 'pageActivated') {
        this.formatHistoryStack();
        this.historyStack.forEach(h => window.history.pushState(
          { navigationId: h.id },
          '',
          '#' + h.url
        ));
      }
    });
  }
}
