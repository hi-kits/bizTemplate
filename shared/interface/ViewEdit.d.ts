
/**
 * 动态组件传值类
 * @interface ViewEditComponent
 * @version 0.0.1
 * @author by fico on 2021/06/01
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export interface ViewEditComponent {
  /** 组件接收的信息 */
  info: any;
  /** 判断当前进入的是三翼鸟还是智家 */
  systemType: number;
  viewData?: any;
  // setData: EventEmitter<any>;
  /** 设置数据 */
  setData(e: any): void;
  setCustomFields(custom: any, formV): void;
}