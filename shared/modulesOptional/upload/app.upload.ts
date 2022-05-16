/**
 * Upload 组件
 * @class AppUploadComponent
 * @version 0.0.1
 * @author by fico on 2018/10/08
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppModuleOptionalParameter } from '@shared/modulesOptional/app.modulesOptional.parameter';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
// 环境配置
import { environment } from '@env/environment';


import { Observable, Observer } from 'rxjs';

// tslint:disable-next-line: new-parens
const appModuleOptionalParameter = new AppModuleOptionalParameter();
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-upload',
  templateUrl: './app.upload.html',
  styleUrls: ['./app.upload.css'],
})
export class AppUploadComponent implements OnInit {
  // 禁用
  @Input() nzDisabled = false;
  // 上传类型
  @Input() type: 'image' | 'file' | 'video' = 'image';
  // 查看文件的回调
  @Input() nzPreview;
  // 必选参数, 上传的地址(图片文件上传、视频文件上传、文档文件上传)
  // tslint:disable-next-line: max-line-length
  @Input() nzAction;
  @Input() showMsg;
  // 接受上传的文件类型
  @Input() nzAccept = 'image/*';
  // 文件类型
  @Input() FILE_TYPE = {
    image: ['gif', 'png', 'bmp', 'jpg', 'jpeg'],
    video: ['mp4', 'mov', 'ogm', 'avi', 'wmv', 'm4v', 'mpg', 'mprg', 'webm', 'ogv', 'sax'],
    excel: ['xls', 'xlsx', 'doc', 'docx'],
    json: ['json'],
    app: ['apk'],
    docx: ['docx', 'doc'],
    text: ['txt'],
    zip: ['zip'],
    p8: ['p8'],
    dSYM: ['dSYM']
  };
  // load
  loading = false;
  // 限制文件大小，单位：M；0 表示不限
  @Input() nzSize = 1;
  @Input() sizeErrorTips = '';
  // 限制文件类型，例如：image/png,image/jpeg,image/gif,image/bmp
  // @Input() nzFileType;
  // 设置上传的请求头部，IE10 以上有效；注意：务必使用 => 定义处理方法。
  // @Input() nzHeaders;
  // 上传所需参数或返回上传参数的方法；注意：务必使用 => 定义处理方法。
  @Input() nzData = {
    biz: 'temp',
    type: 1
  };
  // 文件列表
  @Input() nzFileList = [];
  // 文件数量
  @Input() nzFileListSize = 1;
  // 删除之前
  @Input() beforeRemove = false;
  // 限制图片宽高比例[width,height]
  @Input() nzImgRatio = [];
  // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
  @Output() nzBeforeUpload: EventEmitter<any> = new EventEmitter();
  // 上传文件改变时的状态
  @Output() nzChange: EventEmitter<any> = new EventEmitter();
  // 删除视频
  @Output() nzBeforeRemove: EventEmitter<any> = new EventEmitter();
  // 预览图
  previewImage = '';
  previewVisible = false;
  nzZIndex = 1200;
  previewHeight;
  // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon，showRemoveIcon 和 showDownloadIcon
  showUploadListObj = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    showDownloadIcon: false
  };
  // 上传按钮文字
  uploadFileText;
  @Input() showUploadList;
  // 上传的标题名称
  @Input() upload = appModuleOptionalParameter.upload.upload;

  // upload = appModuleOptionalParameter.upload.upload;
  @Input() uploadFile;
  // 上传按钮不是按钮类型
  @Input() notBtn = false;
  @Input() defaultText = true;
  // 如果需要返回上传的状态
  @Input() uploadingStatus = false;
  constructor(
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    if (!this.nzAction) {
      this.nzAction = this.type === 'image' ? 'plugins/fileUpload/pictureUpload' :
        this.type === 'video' ? 'plugins/fileUpload/videoUpload' : this.type === 'file' ? 'plugins/fileUpload/docUpload' : '';
    }
    this.showUploadList = { ...this.showUploadListObj, ...this.showUploadList };
    this.uploadFileText = this.defaultText ? appModuleOptionalParameter.upload.uploadFile : this.uploadFile;

    if (this.notBtn) {
      this.uploadFile = '上传符号表文件';
    }
  }

  // // 删除
  remove = (file: NzUploadFile) => {
    // this.previewImage = file.url || file.thumbUrl;
    // this.nzChange.emit(this.nzFileList);
    return true;
  }
  //  删除已上传的文件
  removeFile = (file: NzUploadFile) => {
    // this.previewImage = file.url || file.thumbUrl;
    if (this.beforeRemove) {
      return new Observable((observer: Observer<boolean>) => {
        this.nzBeforeRemove.emit(observer);
      });
    }

    return true;
  }
  // 预览方法
  // handlePreview = (file: NzUploadFile) => {
  //   this.previewImage = file.url || file.thumbUrl;
  //   this.previewVisible = true;
  // }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview  && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }
  // 限制图片比例
  imgSizeLImit(file, width, height): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      /* eslint-disable-line no-alert */
      let IS_RESULT = false;
      const _URL = window.URL || window.webkitURL;
      img.onload = () => {
        if (img.width / img.height !== width / height) {
          IS_RESULT = false;
          this.msg.error('图片比例限制' + width + ':' + height);
        } else {
          IS_RESULT = true;
        }
        IS_RESULT ? resolve(IS_RESULT) : reject(IS_RESULT);
      };
      img.src = _URL.createObjectURL(file);
    });
  }
  // 上传文件前的方法
  // cyclomatic-complexity 规则：难以修改的或者复杂的代码
  // tslint:disable-next-line:cyclomatic-complexity
  beforeUpload = (file: File & { isResult }) => {
    let IS_RESULT = false;
    let FILE_RESULT = true;
    // 格式处理
    const format = (type: string[], text: any) => {
      const IS_FILE = file.name.split('.').pop().toLowerCase();
      if (!type.includes(IS_FILE)) {
        this.msg.error(text);
        IS_RESULT = false;
      } else {
        IS_RESULT = true;
      }
    };
    // 文件大小 mac空文件占2-3个字节大概是5byte
    let IS_SIZE = file.size <= 5 ? false : file.size / 1024 / 1024 < this.nzSize;
    if (this.nzSize === 0) {
      IS_SIZE = true;
    }
    if (!IS_SIZE) {
      if (this.sizeErrorTips) { // 自定义错误提示信息
        this.msg.error(`${this.sizeErrorTips}`);
        return false;
      }
      if (this.nzAccept.indexOf('image') > -1) {
        this.msg.error(`${appModuleOptionalParameter.upload.size}${this.nzSize}M!`);
      } else if (this.nzAccept.indexOf('video') > -1) {
        this.msg.error(`${appModuleOptionalParameter.upload.videoSize}${this.nzSize}M!`);
      } else {
        if (file.size <= 5) {
          this.msg.error(appModuleOptionalParameter.upload.empty);
        } else {
          this.msg.error(appModuleOptionalParameter.upload.fileSize(this.nzSize));
        }
      }
      return false;
    }
    this.getFileFormatText(format);
    if (!IS_RESULT) {
      return false;
    }
    // 如果是上传的是图片
    if (this.nzAccept.indexOf('image') > -1) {
      if (this.nzImgRatio.length === 2){
        return new Observable((observer: Observer<boolean>) => {
          this.imgSizeLImit(file, this.nzImgRatio[0], this.nzImgRatio[1]).then(() => {
            observer.next(IS_RESULT && IS_SIZE && FILE_RESULT);
            observer.complete();
          }).catch(err => {
            console.log(err);

          });
        });
      }
      return new Observable((observer: Observer<boolean>) => {
        this.imageSize(file).then(() => {
          file.isResult = true;
          this.nzBeforeUpload.emit(file);
          if (file.isResult === false || file.isResult === undefined) {
            FILE_RESULT = false;
          }
          observer.next(IS_RESULT && IS_SIZE && FILE_RESULT);
          observer.complete();
        });
      });
    }
    file.isResult = true;
    this.nzBeforeUpload.emit(file);
    if (file.isResult === false || file.isResult === undefined) {
      FILE_RESULT = false;
    }
    return IS_RESULT && IS_SIZE && FILE_RESULT;
  }

  getFileFormatText(format) {
    // 图片文件
    if (this.nzAccept.indexOf('image') > -1) {
      format(this.FILE_TYPE.image, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.image.join(',')})`);
    }
    // text文件
    if (this.nzAccept.indexOf('text') > -1) {
      format(this.FILE_TYPE.text, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.text.join(',')})`);
    }
    // docx文件
    if (this.nzAccept.indexOf('docx') > -1) {
      format(this.FILE_TYPE.docx, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.docx.join(',')})`);
    }
    // 安装包文件
    if (this.nzAccept.indexOf('apk') > -1) {
      format(this.FILE_TYPE.app, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.app.join(',')})`);
    }
    // json文件
    if (this.nzAccept.indexOf('json') > -1) {
      format(this.FILE_TYPE.json, `${appModuleOptionalParameter.upload.jsonFormat}(${this.FILE_TYPE.json.join(',')})`);
    }
    // 视频文件
    if (this.nzAccept.indexOf('video') > -1) {
      format(this.FILE_TYPE.video, `${appModuleOptionalParameter.upload.videoFormat}${this.FILE_TYPE.video.join(',')}
      ${appModuleOptionalParameter.upload.videoDecoder}`);
    }
    // excel文件
    if (this.nzAccept.indexOf('excel') > -1) {
      format(this.FILE_TYPE.excel, `${appModuleOptionalParameter.upload.excelFormat}(${this.FILE_TYPE.excel.join(',')})`);
    }
    // zip文件
    if (this.nzAccept.indexOf('zip') > -1) {
      format(this.FILE_TYPE.zip, `${appModuleOptionalParameter.upload.zipFormat}(${this.FILE_TYPE.zip.join(',')})`);
    }
    // p8文件
    if (this.nzAccept.indexOf('p8') > -1) {
      format(this.FILE_TYPE.p8, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.p8.join(',')})`);
    }
    // dSYM文件
    if (this.nzAccept.indexOf('dSYM') > -1) {
      format(this.FILE_TYPE.dSYM, `${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.dSYM.join(',')})`);
    }
  }
  // 获取图片尺寸
  imageSize(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // eslint-disable-next-line
      const that = this;
      const _URL = window.URL || window.webkitURL;
      img.onload = () => {
        file.width = img.width;
        file.height = img.height;
        resolve(file);
      };
      this.previewHeight = 472 * img.height / img.width + 'px';
      img.src = _URL.createObjectURL(file);
    });
  }
  // 上传文件改变时的状态
  handleChange(info: { file: NzUploadFile }): void {
    const status = info.file.status;
    if (status !== 'uploading') {
      // tslint:disable-next-line: no-console
      console.info('[上传列表]', info.file);
    }
    switch (status) {
      case 'uploading':
        this.loading = true;
        this.nzDisabled = true;
        // 如果需返回上传中的状态
        if (this.uploadingStatus) {
          this.nzChange.emit(this.nzFileList);
        }
        break;
      case 'done':
        // Get this url from response in real world.
        // if (info.file.response.retCode === '00000') {
        // 2021-06-09 接口返回值没有retCode字段，因此使用success字段判断
        if (info.file.response.success) {
          // 不展示上传成功的提示
          if (this.showMsg ) {
            this.msg.success(`${info.file.name} ${appModuleOptionalParameter.upload.success}`);
          }
          this.nzChange.emit(this.nzFileList);
        } else {
          this.nzFileList = null;
          // 上传失败时，将失败的response传给父组件，在事件管理项目中批量上传用的自己的上传接口地址，直接在ts文件中给nzActon赋值了接口地址，不会走到app.action.ts文件，拿不到response，因此在这里将response返回，可以弹出失败提示语
          this.nzChange.emit(info.file.response);
          // this.msg.error(`${info.file.response.message}`);
        }
        this.loading = false;
        this.nzDisabled = false;
        break;
      case 'error':
        this.msg.error(`${info.file.name} ${appModuleOptionalParameter.upload.fail}`);
        this.loading = false;
        this.nzDisabled = false;
        break;
      case 'removed':
        this.nzChange.emit(this.nzFileList);
        this.loading = false;
        this.nzDisabled = false;
        break;
      default:
        break;
    }
  }

}
