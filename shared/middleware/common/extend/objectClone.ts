/**
 * 对象克隆
 * @function objectClone
 * @version 0.0.1
 * @author by fico on 2018/06/01
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 */

export function objectClone(Obj: object): object {
  // 判断不是对象
  /* eslint-disable */
  if (Object.prototype.toString.call(Obj) !== '[object Object]' || Obj == null) {
    return Obj;
  }
  // 声明新对象
  const OBJECT = new Object();
  // tslint:disable-next-line:forin
  /* eslint-disable */
  for (const name in Obj) {
    OBJECT[name] = this.cloneObject(Obj[name]);
  }
  return OBJECT;
}
