/**
 * Angular路由复用策略
 * @class ReuseStrategy
 * @version 0.0.1
 * @author by fico on 2020/12/17
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 路由复用策略,跳转路由时，params的refresh='Y'时，刷新页面，refresh='N'时，不刷新页面，保留用户操作状态
 */
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, PRIMARY_OUTLET, Route } from '@angular/router';

export class ReuseStrategy implements RouteReuseStrategy {
    // 等待删除
    private static waitDelete: string;
    // 缓存路由
    public static handlers: {
        [key: string]: DetachedRouteHandle
    } = {};
    /**
     * @description: 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断
     * @param route //
     * @return:
     */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 不允许路由复用
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }
        // 允许路由复用
        // tslint:disable-next-line: no-string-literal
        if (route.routeConfig.data && route.routeConfig.data['reuse']) {
            return true;
        }
    }
    /**
     * @description: 当路由离开时会触发，存储路由,按path作为key存储路由快照&组件当前实例对象
     * @param route .
     * @param handle .
     * @return:
     */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // 重置路由
        if (route.routeConfig.path === 'signin') {
            ReuseStrategy.handlers = {};
        }
        // tslint:disable-next-line: no-string-literal
        if (route.routeConfig.data && route.routeConfig.data['reuse']) {
            const url = this.getRouteUrl(route);
            ReuseStrategy.handlers[url] = handle;
        }
    }

    /**
     * @description:若 path 在缓存中有的都认为允许还原路由
     * @param route .
     * @return:
     */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (route.queryParams.refresh === 'Y') {
            return false;
        }
        const url = this.getRouteUrl(route);
        return !!ReuseStrategy.handlers[url];
    }
    /**
     * @description: 从缓存中获取快照，若无则返回null
     * @param route .
     * @return:
     */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig || route.queryParams.refresh === 'Y' || route.routeConfig.loadChildren) {
            return null;
        }
        // tslint:disable-next-line: no-string-literal
        if (route.routeConfig.data && route.routeConfig.data['reuse']) {
            const url = this.getRouteUrl(route);
            const rtn: DetachedRouteHandle = ReuseStrategy.handlers[url];
            if (rtn !== undefined) {
                return rtn;
            // tslint:disable-next-line:unnecessary-else
            } else {
                return null;
            }
        }
    }

    /**
     * @description: 进入路由触发，判断是否同一路由
     * @param future .
     * @param curr .
     * @return:
     */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.log(future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params), '判断是否是同一个路由')
        // return (
        //   // 同一路由时复用路由
        //   future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params)
        // )
        let ret = future.routeConfig === curr.routeConfig;
        if (!ret) {
            return false;
        }

        const path = ((future.routeConfig && future.routeConfig.path) || '') as string;
        // tslint:disable-next-line: no-bitwise
        if (path.length > 0 && ~path.indexOf(':')) {
            const futureUrl = this.getRouteUrl(future);
            const currUrl = this.getRouteUrl(curr);
            ret = futureUrl === currUrl;
        }
        return ret;
    }
    /**
     * @description:获取路由路径
     * @param route .
     * @return:
     */
    // tslint:disable-next-line: typedef
    private getRouteUrl(route: ActivatedRouteSnapshot) {
        // tslint:disable-next-line: no-string-literal
        const path = route['_routerState'].url.replace(/\//g, '_');
        return path;
    }

    /**
     * @description: 删除快照
     * @param name string
     * @return:
     */
    // tslint:disable-next-line: member-ordering
    public static deleteRouteSnapshot(name: string): void {
        if (ReuseStrategy.handlers[name]) {
            delete ReuseStrategy.handlers[name];
        } else {
            ReuseStrategy.waitDelete = name;
        }
    }
}


