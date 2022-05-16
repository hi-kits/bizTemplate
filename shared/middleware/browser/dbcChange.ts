/**
 * 半角转全角
 * @version 0.0.1
 * @author by ann on 2021/09/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 半角转全角
 */
 export function ToDBC(txtstring): any {
    let tmp = '';
    for (let i = 0; i < txtstring.length; i++) {
      if (txtstring.charCodeAt(i) === 32) {
        tmp = tmp + String.fromCharCode(12288);
      }
      if (txtstring.charCodeAt(i) < 127) {
        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
      }
    }
    return tmp;
  }
/**
 * 全角转半角
 *  ToCDB
 * @version 0.0.1
 * @author by ann on 2021/09/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 *
 */
 export function ToCDB(str): any {
  let tmp = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    }
    else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}
