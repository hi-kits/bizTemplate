/**
 * 构建库组件
 * @class AppLibraryComponent
 * @version 0.0.1
 * @author by fico on 2019/05/21
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
import { Component, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
import { DictionaryServices } from '@shared/services/dictionary.services';
import { Message } from '../message/app.message';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-library',
  templateUrl: './app.library.html',
  styleUrls: ['./app.library.css'],
})

export class AppLibraryComponent implements OnInit {
  // 对话框是否可见
  @Input() visible = false;
  // 文件路径
  @Output() folderPath: EventEmitter<any> = new EventEmitter();
  // 文件路径
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  // 路径深度
  pathDepth: any[];
  // zip名称
  zipName = null;
  // 点击
  isClick = true;
  // 域名
  domain;
  // 文件夹列表
  buildingLibrarylist: any[] = [];
  // 索引
  index = -1;
  // 标题
  title = '构建库';

  constructor(
    private httpServices: HttpServices,
    private message: Message,
    private dictionaryServices: DictionaryServices,
  ) {

  }

  // 获取文件目录
  getFilename(init, path?): void {
    if (!this.isClick) {
      return;
    }
    this.isClick = false;
    // 父路径
    const _parentPath = '';
    // 当前路径
    const _path = '';
    // 参数
    let _options = {domain: this.domain, path: _path, parentPath: _parentPath};
    let isAsync = true;
    if (typeof path === 'object') {
      if (Number(path.type) === 1) {
        isAsync = false;
      }
      _options.parentPath = '/';
      _options.path = path.href;
      // _options.path = "http://10.163.205.239/release_repos/multiChannelPackages/sybird/v2.8.0_2022032404/";
      this.buildingLibrarylist.forEach(element => {
        if (Number(element.type) === -1) {
          _options.parentPath = element.folder;
        }
      });
      this.zipName = null;
      const _folderName = (path.folderName.indexOf('/') > 0) ? path.folderName.substring(0, (path.folderName.length - 1)) : path.folderName ;
      if (Number(path.type) === -1) {
        _options.parentPath = path.href;
        _options.path = '';
        // tslint:disable-next-line: no-string-literal
        _options['type'] = -1;
        this.pathDepth.pop();
      } else if (Number(path.type) === 0) {
        this.pathDepth.push(_folderName);
      } else if (Number(path.type) === 1) {
        this.zipName = path.folderName;
      }
    }
    if (init || Number(path.type) === -1) {
      this.index = -1;
      if (init) {
        this.pathDepth = [];
        _options = {domain: this.domain, path: '', parentPath: ''};
      }
    }
    if (isAsync) {
      this.get(_options, (ResultData) => {
        this.isClick = true;
        this.buildingLibrarylist = ResultData.result;
      });
    } else {
      this.isClick = true;
    }
  }
  // 选择文件目录
  selectFile(item, index): void {
    this.handleClick(item, index);
    this.getFilename(false, item);
  }


  // 获取文件数据
  get(options, callback?: (r) => void, error?: (r) => void): void {
    const paramUrl = 'publish/getFileName'; // 参数url
    const url = environment.paths.SERVER_URL_ONESTOP + paramUrl;

    this.httpServices.HTTP({
        name: 'filename',
        method: 'POST', // 请求方式
        type: 'noLimit',
        url, // 请求url
        paramUrl, // 参数url
        httpBody: {...options}, // 请求数据
        // tslint:disable-next-line: only-arrow-functions typedef
        callback: callback || function() { },
        // tslint:disable-next-line: only-arrow-functions typedef
        error: error || function() { },
        isIgnore: false // 是否忽略返回结果
    });
  }
  ngOnInit(): void {

    this.dictionaryServices.init( ['industry_domain'], 1).then((info) => {
      this.domain = info.industry_domain[0].itemValueStr;
      this.getFilename(true);
    });
  }

  // 保存
  submitForm(): void {
    if (this.zipName) {
      // this.folderPath = this.domain + '/' + this.pathDepth.join('/') + '/' + this.zipName;
      this.folderPath.emit(this.domain + '/' + this.pathDepth.join('/') + '/' + this.zipName);
      this.visible = false;
    } else {
      this.message.warning('请选择".apk"文件');
    }

  }
  handleCancel(): void {
    this.cancel.emit();
    this.visible = false;
  }
  handleClick(value, index): void {
    // toggle效果你可以先判定是否等同，然后设置为-1
    if (Number(value.type) === 1) {
      this.index = index;
    }
  }

}
