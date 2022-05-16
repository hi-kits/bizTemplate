/**
 * 复制到剪贴板
 * @function Copy
 * @version 0.0.1
 * @author by fico on 2019/04/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2019/06/14 添加可选回调函数 callback?
 */

export function Copy(text, callback?): void {
    const ID = 'TEXTAREA_COPY';
    if (!document.getElementById(ID)) {
        // 创建文本域
        const TEXTAREA = document.createElement('textarea');
        // 设置id
        TEXTAREA.id = ID;
        // 赋值
        TEXTAREA.value = text;
        // 设置样式
        TEXTAREA.style.width = '4px';
        TEXTAREA.style.height = '4px';
        TEXTAREA.style.border = '0';
        TEXTAREA.style.opacity = '0';
        TEXTAREA.style.position = 'fixed';
        TEXTAREA.style.top = '0';
        TEXTAREA.style.left = '0';
        // 添加到body
        document.getElementsByTagName('body')[0].appendChild(TEXTAREA);
    } else {
        // tslint:disable-next-line: no-string-literal
        document.getElementById(ID)['value'] = text;
    }

    // tslint:disable-next-line: no-string-literal
    document.getElementById(ID)['select'](); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    console.log('复制成功！');
    if (callback) {
        callback();
    }

}
