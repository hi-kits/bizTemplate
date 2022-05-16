/**
 * 关键字
 * @class SearchkeywordPipe
 * @version 0.0.1
 * @author by fico on 2019/07/10
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 关键字长亮
 */
import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'keyword' })
@Injectable()
export class SearchkeywordPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(val: string, keyword: string): any {
    const Reg = new RegExp(keyword, 'i');
    if (val) {
      const res = val.replace(Reg, `<span style="color: #ff2424;">${keyword}</span>`);
      console.log(res);
      return this.sanitizer.bypassSecurityTrustHtml(res);
    }
  }
}
