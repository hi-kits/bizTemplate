/**
 * APP模块参数
 * @class: AppModuleOptionalParameter
 * @version: 0.0.1
 * @date: 2018/10/29
 * @author: fico
 * @return: string
 * @description:
 */
export class AppModuleOptionalParameter {
    // upload
    upload = {
        upload: '上传',
        uploadFile: '上传文件',
        uploadVideo: '上传视频',
        size: '上传文件大小不能超过',
        videoSize: '视频大小限制',
        videoList: '每篇文章仅可以上传一个视频',
        editorVideoSize: '视频上传大小不允许超过',
        format: '不支持该文件格式,目前只支持',
        jsonFormat: '请上传.json类型的附件!',
        videoFormat: '仅支持上传格式为',
        videoDecoder: '的文件(网页播放需要下载对应解码器)',
        excelFormat: '只能上传excel文件,后缀为',
        zipFormat: '只能压缩包,后缀为',
        fileSize: (text) => `文件大小限制为${text}M以下`,
        success: '文件上传成功!',
        empty: '文件内容不能为空!',
        fail: '文件上传失败!',
        imgSizeTip: '请选择资源位获取图片建议尺寸!',
        errImgSize: '请按规定尺寸上传图片!'
    };
    // DatePicker
    datePicker = {
        placeholder: '请选择日期'
    };
    // fold
    fold = ['收起', '筛选'];
    tableDisplay = ['固定列', '展开列'];
}
