/**
 * 通知提醒框
 * @class Notification
 * @version 0.0.1
 * @author by fico on 2019/06/04
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable } from '@angular/core';
// NG-ZORRO
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root',
})
export class Notification {

    constructor(
        private notification: NzNotificationService,
    ) {}

    create(type: string, title: string, content: string): void {
        this.notification.create(type, title, content);
    }
    success(title: string, content: string, options?): void {
        this.notification.success(title, content, options);
    }
    blank(title: string, content: string, options?): void {
        this.notification.blank(title, content, options);
    }
    error(title: string, content: string, options?): void {
        this.notification.error(title, content, options);
    }
    info(title: string, content: string, options?): void {
        this.notification.info(title, content, options);
    }
    warning(title: string, content: string, options?): void {
        this.notification.warning(title, content, options);
    }

}
