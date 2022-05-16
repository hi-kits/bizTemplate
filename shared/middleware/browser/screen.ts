/**
 * Screen 库
 * @version 0.0.1
 * @author by fico on 2021/08/14
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 * 检测设备信息，返回当前设备状态对象。
 */

export class Screen{
    /**
     * 预览尺寸
     */
    private PreviewSize = 375;
    /**
     * 原始尺寸
     */
    private OriginalSize = 1080;
    /**
     * 将1080尺寸数值转换成375预览的尺寸
     * @param value 需要转换的数值
     */
    toPreview(value: number): number {
        return this.PreviewSize / this.OriginalSize * value;
    }
    /**
     * 将375尺寸数值转换成1080原始的尺寸
     * @param value 需要转换的数值
     */
    toOriginal(value: number): number {
        return this.OriginalSize / this.PreviewSize  * value;
    }
}


