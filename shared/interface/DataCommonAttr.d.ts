
/**
 * 动态组件传值类
 * @interface DataCommonAttr
 * @version 0.0.1
 * @author by ytt on 2021/06/04
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export interface DataCommonAttr {
   /** 组件的唯一标识 */
   flag?: number;
   /** 组件别名 */
   alias: string;
   aliasName?: string;
   aliasCode?: number;
   custom?: {
      [x: string]: any
   };
}
