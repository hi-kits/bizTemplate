/**
 * 消息服务
 * @class Message
 * @version 0.0.1
 * @author by fico on 2019/04/29
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class Message {

    constructor(
        private message: NzMessageService,
    ) {}

    success(text: string | TemplateRef<void>): void  {
        this.message.success(text);
    }
    warning(text: string | TemplateRef<void>): void  {
        this.message.warning(text);
    }
    error(text: string | TemplateRef<void>): void  {
        this.message.error(text);
    }
    info(text: string | TemplateRef<void>): void  {
        this.message.info(text);
    }
    // duration: 持续时间(毫秒)，当设置为0时不消失
    loading(text: string | TemplateRef<void>, duration?): void  {
        if (duration) {
            this.message.loading(text, { nzDuration: duration});
        } else {
            this.message.loading(text);

        }
    }

}
