/**
 * 图片转换
 * @class ImgConvertPipe
 * @version 0.0.1
 * @author by fico on 2021/07/06
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { NgModule } from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convert' })
@Injectable({
    providedIn: 'root',
})
export class ImagesPipe implements PipeTransform {

    constructor(
    ) { }
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
    convert(src): Promise<any> {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = '*';  // 必须在image之前赋值
            image.src = src + '?v=' + Math.random(); // 处理缓存
            image.onload = () => resolve(image);
        });
    }
    transform(val: string): any {
        if (val) {
            // setTimeout(() => {
            return this.convert(val).then(image => {
                const base64 = this.getBase64(image);
                return (base64);
            });
            // return val;
            // }, 10);
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
@NgModule({
    imports: [],
    declarations: [ImagesPipe],
    exports: [ImagesPipe],
})

export class ImagesPipeModule {
}
