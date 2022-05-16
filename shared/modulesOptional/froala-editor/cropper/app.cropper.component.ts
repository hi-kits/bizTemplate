/**
 * 图片剪切
 * @class APPCropperComponent
 * @version 0.0.1
 * @author by fico on 2020/05/26
 * @Copyright © 2020 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
// 页面事件
import { ImageCroppedEvent } from 'ngx-image-cropper';
// 消息
import { Message } from '@shared/modulesOptional/message/app.message';

// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 类型接口
import { HttpOption } from '@int/types';

@Component({
  selector: 'app-cropper',
  templateUrl: './app.cropper.component.html',
  styleUrls: ['./app.cropper.component.css']
})

export class APPCropperComponent implements OnInit {
  // ------------------ 参数 ------------------
  showCropperModal = true;
  // 标题
  title = '编辑封面';
  // 当前图片
  @Input() videoPosterUrl;
  @Output() uploadEnd: EventEmitter<number> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  imageChangedEvent: any = '';

  croppedImage: any;

  // 比例
  aspectRatio = (1 / 1);
  // 比例值
  RatioValue = 1;
  // 根据aspectRatio保持裁剪图像的宽度和高度相等
  maintainAspectRatio = false;
  // 是否允许裁剪 默认可以裁剪 如果选择GIF图，则不可以裁剪
  idDisabled = false;
  isSync = false;
  // 视频封面的剪裁大小
  resizeToWidth = 600;
  imageBase64;

  // ------------------ 函数 ------------------
  constructor(
    private httpServices: HttpServices,
    private message: Message
  ) {
  }

  // 组件初始化
  ngOnInit(): void {
    alert(111);
    this.croppedImage = this.videoPosterUrl;
    if (this.croppedImage) {
      this.getImgToBase64(this.croppedImage, (Base64) => {
        this.imageBase64 = Base64;
      });
    }
    this.switchRatio(this.RatioValue);
  }

  // ------------------ 自定义函数 ------------------
  // 关闭 modal
  handleCancel(): void {
    this.close();
  }
  close(): void {
    this.showCropperModal = true;
    this.closeModal.emit();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
      this.croppedImage = event.base64;
      // this.uploadImg(this.croppedImage);

  }
  imageLoaded(): void {
    console.log('img load');
      // show cropper
  }
  cropperReady(): void {
    console.log('cropper ready');
      // cropper ready
  }
  loadImageFailed(): void {
    console.log('show message');
      // show message
  }
  // 将图片转换为Base64
  getImgToBase64(url, callback): void {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // tslint:disable-next-line:new-parens
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload =  () => {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
      canvas = null;
    };
    img.src = url + '?' + (+new Date());
  }
  // 上传图片
  uploadImg(imgBase64): void {
    if (this.RatioValue !== 3) {
      this.set('uploadImgByBase64', {imgBase64}, (ResultData) => {
        this.setResult(ResultData);
      });
    } else {
      if (this.imageChangedEvent !== '') {
        const formData = new FormData();
        formData.append('file', this.imageChangedEvent.target.files[0]);
        formData.append('type', '1');
        formData.append('sizeLimit', '1');
        this.set('upload', formData, (ResultData) => {
          this.setResult(ResultData);
        });
      } else {
        this.setResult({
          data: {
            url: this.videoPosterUrl
          }
        });
      }
    }
  }
  // 修改返回值
  setResult(ResultData?): void {
    // this.cropperUrlChange.emit(ResultData.data.url);
    this.uploadEnd.emit(ResultData.data.url);
    this.close();
  }
  // 提交
  submitForm(): void {
    this.uploadImg(this.croppedImage);
  }
  // 切换比例
  switchRatio(type): void {
    this.RatioValue = type;
    // GIF图
    if (type === 3) {
      this.idDisabled = true;
    } else {
      this.idDisabled = false;
    }
    this.aspectRatio = type === 1 ?  (4 / 3) : type === 2 ? (3 / 4) : type === 4 ? (5 / 2) : (1 / 1);
    switch (type) {
      case 1:
      case 4:
      case 2:
        this.maintainAspectRatio = true;
        break;
      default:
        this.maintainAspectRatio = false;
        break;
    }
  }
  handleOk(): boolean {
    // 图片大小限制1M以内
    if (this.imageChangedEvent.target && this.imageChangedEvent.target.files[0]) {
      const fileSize = this.imageChangedEvent.target.files[0].size;
      const fileMaxSize = 1024 * 1024 * 1;
      if (fileSize > fileMaxSize) {
        this.message.warning('图片大小限制1M以内');
        return false;
      }
    }
    // GIF动图--仅支持gif动图上传
    if (
      this.RatioValue === 3 &&
      (
        (
          this.imageChangedEvent.target && this.imageChangedEvent.target.files[0] &&
          !this.imageChangedEvent.target.files[0].name.endsWith('.gif')) ||
          (!this.imageChangedEvent.target && this.videoPosterUrl && !this.videoPosterUrl.endsWith('.gif')
        )
      )
    ) {
      this.message.warning('仅支持gif动图上传，静态图片请选择其他格式');
      return false;
    }
    this.submitForm();
  }



  // 请求
  private httpSend(options: HttpOption): Promise<any> {
    return this.httpServices.HTTP(options, (ResultData) => {
        if (ResultData.name.indexOf('Delete') > -1) {
            this.message.success('删除成功！');
        }
    }, (error) => {
        if (error.name !== 'msgTest') {
            this.message.warning(error.result.message !== '' ? error.result.message : '数据错误！');
        }
    });
  }
  // 提交数据
  set(name, options: any, callback?: (r) => void, error?: () => void): Promise<any> {
    const HTTP_BODY = {...options}; // 请求数据
    let URL = ''; // 请求url
    let PARAM_URL = ''; // 参数url
    const METHOD = 'POST'; // 请求方式
    let IS_IGNORE = false; // 是否忽略返回结果
    switch (name) {
        // 图片上传
        case 'upload':
          IS_IGNORE = true;
          PARAM_URL = 'plugins/fileUpload/pictureUpload';
          break;
        // 图片上传 Base64
        case 'uploadImgByBase64':
          // IS_IGNORE = true;
          PARAM_URL = 'scspgc/commons/v2/uploadImgByBase64';
          break;
        default:
            return null;
    }
    // URL = 'http://10.180.109.178:11790' + PARAM_URL;
    URL = environment.paths.SERVER_URL + PARAM_URL;
    return this.httpSend({
        name,
        method: METHOD,
        url: URL,
        paramUrl: PARAM_URL,
        httpBody: HTTP_BODY,
        // tslint:disable-next-line: only-arrow-functions
        callback: callback || function(): void { },
        // tslint:disable-next-line: only-arrow-functions
        error: error || function(): void  { },
        isIgnore: IS_IGNORE
    });
  }
}
