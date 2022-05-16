/**
 * 图片转换处理
 * @fn Picture
 * @version 0.0.1
 * @author by fico on 2019/04/30
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 2019/06/14 添加可选回调函数 callback?
 */
export class Picture {
    // 转换格式
    getBase64(img): string {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL('image/png');  // 可选其他值 image/jpeg
        return dataURL;
    }
    // 转换
    convert(src, callback): void{
        const image = new Image();
        image.crossOrigin = '*';  // 必须在image之前赋值
        image.src = src + '?v=' + Math.random(); // 处理缓存
        image.onload = () => {
            const base64 = this.getBase64(image);
            callback(base64);
        };
    }
}

