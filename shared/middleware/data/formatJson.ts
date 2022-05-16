/**
 * JSON 格式化
 * @function JSONFormat
 * @version 0.0.1
 * @author by fico on 2019/05/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

export function JSONFormat(Json): any{
    // 着色
    const highlight = (json) => {
        json = JSON.stringify(json, undefined, 4);
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        document.getElementsByName('body');
        const STYLE = document.createElement('style');
        // tslint:disable-next-line: no-string-literal
        STYLE['type'] = 'text/css';
        STYLE.appendChild(document.createTextNode(`
            .JSONNumber{color:#A0A}
            .JSONKey{color:#03F;font-weight:bold}
            .JSONString{color:#077}
            .JSONBoolean{color:#dc296b}
            .JSONNull{color:#9e9e9e}
        `));
        const HEAD = document.getElementsByTagName('head')[0];
        HEAD.appendChild(STYLE);

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,  (match) => {
            let CLS = 'JSONNumber';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    CLS = 'JSONKey';
                } else {
                    CLS = 'JSONString';
                }
            } else if (/true|false/.test(match)) {
                CLS = 'JSONBoolean';
            } else if (/null/.test(match)) {
                CLS = 'JSONNull';
            }
            return '<span class="' + CLS + '">' + match + '</span>';
        });
    };
    return highlight(Json);

}
