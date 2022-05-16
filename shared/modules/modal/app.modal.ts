/**
 * Modal 组件
 * @export
 * @class AppModalComponent
 * @implements {OnInit}
 * @version 0.0.1
 * @author by fico on 2018/10/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
// import { NzModalService  } from 'ng-zorro-antd/modal';
// import { Router, Navigation } from '@angular/router';

// import { Location } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modal',
  templateUrl: './app.modal.html',
  styles: [`
  .hideFooter ::ng-deep .ant-modal-footer{padding: 0;border-top:none};
  .hideFooter ::ng-deep .ant-modal-content{height:500px;overflow:auto};
  `],
})

export class AppModalComponent implements OnInit {
  // 确认提醒
  @Input() isConfirm: boolean;
  // 确认提醒模板
  @Input() confirmTemplate: TemplateRef<any>;
  // 确认提醒取消
  @Output() nzConfirmOnCancel = new EventEmitter();
  // 对话框是否可见
  @Input() isVisible = false;
  // 自定义按钮
  @Input() customButton: string[];
  // 自定义确认按钮
  @Input() customConfirmButton: string[];
  // 垂直居中展示
  @Input() nzCentered = false;
  // 导航历史变化时是否关闭模态框
  @Input() nzCloseOnNavigation = false;
  @Input() nzClosable = true;
  // 是否回退
  @Input() nzStyle = { top: '50px'};
  // 是否回退
  @Input() isBack = true;
  // 标题
  @Input() title;
  // 宽度
  @Input() nzWidth = 520;
  // 点击蒙层是否允许关闭
  @Input() nzMaskClosable = false;
  // 点击确定回调
  @Output() nzOnOk = new EventEmitter();
  // 隐藏按钮
  @Input() hideButton = false;
  // 点击遮罩层或右上角叉或取消按钮的回调
  @Output() nzOnCancel = new EventEmitter();
  // 弹框确认文本
  OkText: string;
  // 隐藏弹框确认按钮
  @Input() nzOkDisabled = false;
  // 设置按钮载入状态
  @Input() isLoading;
  // 弹框取消文本
  CancelText: string;
  // 隐藏弹框取消按钮
  @Input() nzCancelDisabled = false;
  // 父组件中获得子组件的引用
  @ViewChild('Modal', {static: false}) Modal;
  confirmOkText = '确认';
  confirmCancelText;
  isContent = false;
  @Input() loading;
  constructor(
  //  private modal: NzModalService,
   private location: Location

  ) {}

  /**
   * Modal 打开后的回调
   * @fn nzAfterOpen
   */
  nzAfterOpen(ev): void {
    // this.isContent = true;
  }
  /**
   * 设置按钮文本
   * @fn customButFn
   */
  customButFn(): void {
    if (!this.customButton) {
      this.OkText = '保存';
      this.CancelText = '取消';
    } else {
      this.OkText = this.customButton[0];
      this.CancelText = this.customButton[1] || '取消';
    }
    if (this.customConfirmButton) {
      this.confirmOkText = this.customConfirmButton[0];
      this.confirmCancelText = this.customConfirmButton[1] || '取消';
    }
  }

  /**
   * 初始化
   * @fn ngOnInit
   */
  ngOnInit(): void {
    this.loading = this.isLoading ? true : false;
    setTimeout(() => {
      this.customButFn();
      this.isVisible = true;
    }, 50);
  }

  /**
   * 关闭并回退
   * @fn close
   */
  close(): void {
    this.isVisible = false;
    if (this.isBack) {
      // setTimeout(() => {
      //   // this.Modal.close();
      // history.go(-1);
      // this.navigation.previousNavigation
      // console.log(this);
      // }, 100);
    }
  }
  /**
   * 取消
   * @fn handleCancel
   */
  handleCancel(ev): void {
    this.nzOnCancel.emit();
    this.close();
  }
  nzAfterClose(ev): void {
    if (this.isBack) {
      // setTimeout(() => {
      // this.Modal.close();
      this.location.back();
      // window.history.go(-1);
      // }, 300);
    }
  }
  /**
   * 确认提醒取消
   * @fn confirmCancel
   */
  confirmCancel(): void {
    if (this.confirmCancelText === '我要手动上线') {
      this.handleOk(2);
    } else {
      this.nzConfirmOnCancel.emit();
    }

  }
  /**
   * 保存
   * @fn handleOk
   */
  handleOk(type?): void {
    if (type) {
      this.nzOnOk.emit(type);
    } else {
      this.nzOnOk.emit(1);
    }
  }
}
