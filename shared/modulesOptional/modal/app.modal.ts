/**
 * modal服务
 * @class Modal
 * @version 0.0.1
 * @author by fico on 2019/06/14
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Injectable } from '@angular/core';
import { ModalOptions, NzModalService  } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root',
})
export class Modal {

    constructor(
        private modal: NzModalService ,
    ) {}

    success(options?: ModalOptions<unknown, any>): void {
        this.modal.success(options);
    }
    warning(options?: ModalOptions<unknown, any>): void {
        this.modal.warning(options);
    }
    error(options?: ModalOptions<unknown, any>): void {
        this.modal.error(options);
    }
    info(options?: ModalOptions<unknown, any>): void {
        this.modal.info(options);
    }
    confirm(options?: ModalOptions<unknown, any>): void {
        this.modal.confirm(options);
    }

}
