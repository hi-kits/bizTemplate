/**
 * 保持Html
 * @class EscapeHtmlPipe
 * @version 0.0.1
 * @author by fico on 2018/10/14
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description:
 * 保持对DOM元素添加。
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml' })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
