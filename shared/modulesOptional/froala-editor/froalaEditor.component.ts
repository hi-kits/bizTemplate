import { Component, OnInit, Input, Output, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { AppModuleOptionalParameter } from '@shared/modulesOptional/app.modulesOptional.parameter';
import { NzMessageService } from 'ng-zorro-antd/message';
import FroalaEditor from 'froala-editor';
// 用户信息
import { AppParam } from '@user';
import { getUrlParams } from '@mid/browser/getUrlParams';
const urlParam = getUrlParams();

// 环境配置
import { environment } from '@env/environment';



import './lib/js/plugins/align.min.js';
import './lib/js/plugins/char_counter.min.js';
import './lib/js/plugins/draggable.min.js';
import './lib/js/plugins/entities.min.js';
import './lib/js/plugins/link.min.js';
import './lib/js/plugins/quick_insert.min.js';
import './lib/js/plugins/lists.min.js';
import './lib/js/plugins/paragraph_format.min.js';
import './lib/js/plugins/quote.min.js';
import './lib/js/plugins/line_height.min.js';
import './lib/js/third_party/embedly.min.js';

import './lib/js/languages/zh_cn.js';
import './lib/js/plugins/image.min.js';
import './lib/js/plugins/video.min.js';
import './lib/js/plugins/files_manager.min.js';
// declare const FroalaEditor: any;

// tslint:disable-next-line: new-parens
const appModuleOptionalParameter = new AppModuleOptionalParameter;


let myFroalaEditor;

@Component({
  selector: 'app-froala-editor',
  templateUrl: './froalaEditor.component.html',
  styleUrls: ['./froalaEditor.component.css']
})

export class FroalaEditorComponent implements OnInit, OnDestroy {
  // 文件类型限制
  FILE_TYPE = {
    image: ['gif', 'png', 'bmp', 'jpg', 'jpeg'],
    video: ['mp4', 'mov', 'ogm', 'avi', 'wmv', 'm4v', 'mpg', 'mprg', 'webm', 'ogv', 'sax']
  };
  UPLOAD_URL = {
    image: '',
    video: '',
    files: '',
  };
  // 编辑器配置选项
  options;

  // tslint:disable-next-line:variable-name
  video_url;
  // 富文本内容
  @Input() froalaText = '';
  // 地址判断
  @Input() froalaUrl = 2;
  // 图片限制文件大小，单位：M；0 表示不限
  @Input() nzSize = 1;
  // 视频限制文件大小，单位：M；0 表示不限
  @Input() nzVideoSize = 200;
  // 视频限制个数
  @Input() nzVideoListSize = 1;
  // 接受上传的文件类型
  nzAccept = 'image/*';
  // 用于保存videoPosterUrl的subscribe对象
  vpUrlSubscription;
  // 内容改变，和文章发布页面交互
  @Output() contentChange: EventEmitter<any> = new EventEmitter();
  // showCropperModal 是否展示视频封面剪裁modal
  showCropperModal = false;
  // 视频封面的地址
  videoPosterUrl;
  constructor(
    private msg: NzMessageService,
    public ngZone: NgZone,
    private appParam: AppParam) {
    // tslint:disable-next-line:no-string-literal
    myFroalaEditor = this;
  }

  ngOnInit(): void {
    console.log(this.appParam);
    this.froalaUrlFun();
    // tslint:disable-next-line: no-string-literal
    this.appParam.headers['X-Access-Token'] = urlParam['token'] || '';

    // 自定义视频封面上传按钮
    FroalaEditor.DefineIcon('videoPoster', { NAME: 'upload', SVG_KEY: 'insertImage' });
    FroalaEditor.RegisterCommand('videoPoster', {
      title: '上传封面',
      focus: false,
      undo: false,
      toggle: true,
      // tslint:disable-next-line:object-literal-shorthand
      callback: function () {
        // tslint:disable-next-line:no-string-literal
        myFroalaEditor['eFroalaScope'] = this;
        // 打开编辑视频封面modal
        // tslint:disable-next-line:no-string-literal
        // 视频封面可以选择比例
        // myFroalaEditor.appParameter.currentItem.cropperType = 4;
        // // 视频封面的剪裁大小
        // myFroalaEditor.appParameter.currentItem.resizeToWidth = 600;
        myFroalaEditor.editVideoPoster();
      }
    });
    // 富文本编辑器相关配置
    this.options = {
      // 配置语言
      language: 'zh_cn',
      // 文本框提示内容
      placeholderText: '请输入内容',
      // 是否开启统计字数
      charCounterCount: true,
      linkAutoPrefix: '',
      // 最大输入数
      charCounterMax: 20000,
      // 注意导航条的配置, 按照官方的文档,无法配置,使用toolbarButtons来配置了。
      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'quote', 'paragraphFormat', 'formatOLSimple', 'formatUL',
        'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'insertFiles', 'insertImage', 'insertVideo', 'lineHeight', 'outdent', 'indent', 'insertLink', 'align', 'clearFormatting', 'undo', 'redo'],
      // 文件管理 - 类型
      filesManagerAllowedTypes: ['image/gif', 'image/jpg', 'image/png', 'image/jpeg', 'image/webp', 'image/bmp'],
      // 文件管理 - 大小限制
      filesManagerMaxSize: 1024 * 1024 * 20,
      filesManagerUploadURL: this.UPLOAD_URL.files,
      filesManagerUploadParams: {
        type: 1,
        // 类型为图片时，是否限制图片大小 0：不限制 ，1，限制为1M
        sizeLimit: 0
      },
      filesInsertButtons: ['imageBack', '|', 'filesUpload'],
      // requestWithCORS: true,
      // 高亮显示html代码
      codeMirror: false,
      // 配置html代码参数
      codeMirrorOptions: {
        tabSize: 4
      },
      // fontSize: {}
      // 设置行距选择值
      lineHeights: {
        Single: '1',
        // tslint:disable-next-line:object-literal-key-quotes
        '1.5': '1.5',
        Double: '2'
      },
      fontSizeSelection: true,
      fontSize: ['8', '10', '12', '14', '18', '30', '60', '96'],
      fontSizeUnit: 'px',
      // 只粘贴文本，不包含格式
      pastePlain: true,
      // 断行设置 目前也是屏蔽的需要enable对应的插件
      lineBreakerOffset: 20,
      // 左侧快速添加按钮,目前是屏蔽的
      quickInsertButtons: ['image', 'video'],
      // 请求头
      requestHeaders: {
        ...this.appParam.headers
      },
      // 视频上传URl
      videoUploadURL: this.UPLOAD_URL.video,
      // 视频上传参数
      videoUploadParams: {
        type: 2,
        sizeLimit: 0
      },
      // 视频默认居中
      videoDefaultAlign: 'left',
      // 视频INSERT选择按钮
      videoInsertButtons: ['videoBack', '|', 'videoUpload'],
      // 视频EDIT选择按钮, 'videoReplace', 'autoplay', 'videoSize'---这三项是必须的，否则会报错
      videoEditButtons: ['videoReplace', 'videoRemove', 'videoPoster', 'autoplay'],
      // 插入适配屏幕大小的视频 为true设置videoSize不起作用
      videoResponsive: false,
      // 视频最大200M
      videoMaxSize: 1024 * 1024 * 1024,
      // 为true的时候，编辑器的内容将放置在iframe中，并与页面的其余部分隔离
      iframe: false,
      // iframeStyle: '.fr-video {width: 420px; height: 240px;margin: 0 auto;}',
      // 最小高度
      heightMin: 400,
      // 最大高度
      heightMax: 500,
      // 图片最大20M
      imageMaxSize: 20 * 1024 * 1024,
      // 禁用图片改变大小
      imageResize: true,
      // 图片默认边距 - 设置无效
      imageDefaultMargin: 0,
      // 图片默认宽度
      imageDefaultWidth: '',
      // 图片默认display
      imageDefaultDisplay: 'block',
      // 图片默认居中
      imageDefaultAlign: 'left',
      // 上传图片配置
      imageUploadURL: this.UPLOAD_URL.image,
      // 接口其他传参,默认为空对象{},
      imageUploadParams: {
        type: 1,
        // 类型为图片时，是否限制图片大小 0：不限制 ，1，限制为1M
        sizeLimit: 0
      },
      imageUploadMethod: 'POST',
      // 图片INSERT选择按钮
      imageInsertButtons: ['imageBack', '|', 'imageUpload'],
      // 图片编辑按钮
      imageEditButtons: ['imageReplace', 'imageAlign', 'imageInfo', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove'],
      // Enables list advanced types for the bullets.
      listAdvancedTypes: true,
      // 插件
      pluginsEnabled: ['align', 'charCounter', 'draggable', 'image', 'link', 'lists', 'quote', 'video', 'embedly', 'paragraphFormat', 'lineHeight', 'filesManager'
      ],
      events: {
        // 当点击视频按钮时
        // tslint:disable-next-line:object-literal-shorthand
        'popups.show.video.insert': function a() {
          const content = this.html.get();
          // 视频个数的校验
          const videolist = content && content.match(/(<video.*>.*video>)/g);
          if (videolist && videolist.length >= myFroalaEditor.nzVideoListSize) {
            myFroalaEditor.msg.error(`${appModuleOptionalParameter.upload.videoList}!`);
            // tslint:disable-next-line:quotemark
            this.popups.hide("video.insert");
            return false;
          }
        },
        // 图片上传之前
        'image.beforeUpload': (images) => {
          myFroalaEditor.nzAccept = 'image/*';
          for (const image of images) {
            return this.validteBeforeUpload(image);
          }
        },
        // 图片上传之后
        'image.uploaded': function uploaded(response) {
          response = JSON.parse(response);
          if (response.code === 200) {
            let link;
            if (!response.result.url) {
              link = response.result;
            } else {
              link = response.result.url;
            }
            this.image.insert(link, false, null, this.image.get(), { link });
            return false;
          }

          myFroalaEditor.msg.error(response.message);
          // const url = environment.origin ? 'https://zjrs.haier.net/shdp/assets/error.png' : 'https://zjrs.haier.net/smp/assets/error.png ';
          const url = '';
          this.image.insert(url, false, null, this.image.get(), { link: url });
          return false;
        },
        // 视频上传之前
        'video.beforeUpload': ($video) => {
          myFroalaEditor.nzAccept = 'video/*';
          for (const video of $video) {
            return this.validteBeforeUpload(video);
          }
        },
        // tslint:disable-next-line:object-literal-shorthand
        'video.uploaded': function (response) {
          response = JSON.parse(response);
          if (response.code === 200) {
            // 将视频URl保存在富文本编辑器组件上
            // tslint:disable-next-line:no-string-literal
            if (!response.result.url) {
              myFroalaEditor['video_url'] = response.result;
            } else {
            myFroalaEditor['video_url'] = response.result.url;
            }
            const videoTag = myFroalaEditor.getVideoHtml();
            this.video.insert(videoTag);
            // this.events.focus(!0);
            // 如果编辑器未获得焦点，否则会无法将内容更新到父组件，重新触发下
            // tslint:disable-next-line:no-string-literal
            myFroalaEditor['froalaChange'](this.html.get());
            // return false;
          }
        },
        // 视频移除之后
        // tslint:disable-next-line:object-literal-shorthand
        'video.removed': ($video) => {
          this.video_url = '';
          this.videoPosterUrl = '';
        },
        'filesManager.uploaded': (response) => {
          response = JSON.parse(response);
          if (response.code === 200) {
            response.link = response.result.url;
          } else {
            myFroalaEditor.msg.error(response.message);
          }
          return JSON.stringify(response);
        }
      }
    };

  }
  // 打开视频封面modal
  editVideoPoster(): void {
    // 先聚焦
    // tslint:disable-next-line: no-string-literal
    myFroalaEditor['eFroalaScope'].events.focus();
    // tslint:disable-next-line:no-string-literal
    this.videoPosterUrl = myFroalaEditor['eFroalaScope'].video.get().contents().attr('poster') || null;
    // tslint:disable-next-line:no-string-literal
    this.video_url = myFroalaEditor['eFroalaScope'].video.get().contents().attr('src') || null;
    // run强制更新，来解决刷新延时 - 视频封面上传
    this.ngZone.run(() => {
      this.showCropperModal = true;
      // tslint:disable-next-line: no-string-literal
      // myFroalaEditor['eFroalaScope'].popups.hideAll(['video.edit']);
    });
  }

  // 获取输入的数据(数据为html数据，但是不能输入html语法，否则会发生数据转义)
  froalaChange(event): void {
    // 给父组件发数据
    this.contentChange.emit(event);
  }
  // 视频封面地址改变
  cropperUrlChange(event): void {
    // 重新改变视频html
    const videoTag = this.getVideoHtml();
    // tslint:disable-next-line:no-string-literal
    const $html = myFroalaEditor['eFroalaScope'].html.get().toString();
    const newHtml = $html.replace(/(<video.*>.*video>)/g, videoTag);
    // 重新设置html的内容
    // tslint:disable-next-line:no-string-literal
    myFroalaEditor['eFroalaScope'].html.set(newHtml);
    // 如果编辑器未获得焦点，否则会无法将内容更新到父组件，重新触发下
    // tslint:disable-next-line:no-string-literal
    myFroalaEditor['froalaChange'](newHtml);
  }

  // 拼接videohtml片段
  getVideoHtml(): string {
    return '<video controls src="' + this.video_url + '" ' +
      (this.videoPosterUrl ? 'poster="' + this.videoPosterUrl + '"' : '') + '></video>';
  }

  // 图片和视频上传之前的验证
  validteBeforeUpload(file): boolean {
    let IS_RESULT = false;
    let IS_SIZE = true;
    // 图片文件
    if (this.nzAccept.indexOf('image') > -1) {
      IS_SIZE = file.size / 1024 / 1024 < this.nzSize;
      if (!IS_SIZE) {
        this.msg.error(`${appModuleOptionalParameter.upload.size}${this.nzSize}M!`);
      }
      const IS_FILE = file.type.split('/').pop().toLowerCase();
      if (!this.FILE_TYPE.image.includes(IS_FILE)) {
        this.msg.error(`${appModuleOptionalParameter.upload.format}(${this.FILE_TYPE.image.join(',')})`);
        IS_RESULT = false;
      } else {
        IS_RESULT = true;
      }
    }
    // 视频文件
    if (this.nzAccept.indexOf('video') > -1) {
      IS_SIZE = file.size / 1024 / 1024 < this.nzVideoSize;
      if (!IS_SIZE) {
        this.msg.error(`${appModuleOptionalParameter.upload.editorVideoSize}${this.nzVideoSize}M!`);
      }
      const IS_FILE = file.name.split('.').pop().toLowerCase();
      if (!this.FILE_TYPE.video.includes(IS_FILE)) {
        this.msg.error(`${appModuleOptionalParameter.upload.videoFormat}${this.FILE_TYPE.video.join(',')}${appModuleOptionalParameter.upload.videoDecoder}`);
        IS_RESULT = false;
      } else {
        IS_RESULT = true;
      }
      // 视频个数的校验
      // const videolist = this.froalaText && this.froalaText.match(/(<video.*>.*video>)/g);
      // if (videolist && videolist.length >= this.nzVideoListSize) {
      //   this.msg.error(`${appModuleOptionalParameter.upload.videoList}!`);
      //   return false;
      // }
    }
    // this.nzFileListSize
    return IS_RESULT && IS_SIZE;
  }

  //  当视频封面上传成功后，需要重新修改video标签poster属性
  updateVideoPosterUrl(url): void {
    this.videoPosterUrl = url;
    this.showCropperModal = false;
    this.cropperUrlChange(url);
  }

  closeCropperModa(): void {
    this.showCropperModal = false;
  }
  ngOnDestroy(): void {
    // this.vpUrlSubscription.unsubscribe();
  }
  // 不同环境使用编辑器上传文件
  froalaUrlFun(): void {
    if (this.froalaUrl === 1) {
      this.UPLOAD_URL = {
        image: environment.paths.SERVER_URL_NEBULA + 'sys/common/upload',
        video: environment.paths.SERVER_URL_NEBULA + 'sys/common/upload',
        files: environment.paths.SERVER_URL_NEBULA + 'sys/common/upload',
      };
    } else {
      this.UPLOAD_URL = {
        image: (environment.origin ? environment.paths.SERVER_URL_SYN + 'plugins/syn/' : environment.paths.SERVER_URL + 'plugins/') + 'fileUpload/pictureUpload' ? '' : '',
        video: (environment.origin ? environment.paths.SERVER_URL_SYN + 'plugins/syn/' : environment.paths.SERVER_URL + 'plugins/') + 'fileUpload/videoUpload',
        files: (environment.origin ? environment.paths.SERVER_URL_SYN + 'plugins/syn/' : environment.paths.SERVER_URL + 'plugins/') + 'fileUpload/docUpload',
      };
    }
  }

}
