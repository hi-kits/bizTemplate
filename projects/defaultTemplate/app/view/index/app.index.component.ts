/*
 * 首页页面
 * @class: APPIndexComponent
 * @Author: yzy
 * @Date: 2020-08-20 08:39:19
 * @Last Modified by: yzy
 * @Last Modified time: 2020-10-14 16:28:17
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// 列表页面函数混入
import { ViewIndexMixin } from '@shared/mixins/view.index.mixin';
// 页面事件
import { ViewAction } from '../../app.action';
// 参数
import { AppParameter } from '../../app.parameter';
import { Message } from '@shared/modulesOptional/message/app.message';
// 页面接口
import { Power } from '@shared/interface/tabular';
// 操作鉴权
import { ValidatorAction } from '@shared/services/app.validator.services';
// APP参数
import { AppParam } from '@user';
// 数组处理
import { ArrayIndex } from '@mid/common/extend/arrayIndex';
@Component({
  selector: 'app-root',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.scss']
})

export class APPIndexComponent extends ViewIndexMixin implements OnInit {

  constructor(
    private router: Router,
    private appParameter: AppParameter,
    private validatorAction: ValidatorAction,
    private message: Message,
    private viewAction: ViewAction,
    private appParam: AppParam,
  ) {
    super(viewAction);
  }
  loading = false;
  pages = null;
  current = null;
  // 权限控制显示
  power: Power = {
  };

  // ------------------ 参数 ------------------
  // 页面索引
  public get PageIndex(): number {
    return this.appParameter.currentItem.viewPage.index;
  }
  public set PageIndex(value) {
    this.appParameter.currentItem.viewPage.index = value;
  }
  // 页面数据分页
  public get PageSize(): number {
    return this.appParameter.currentItem.viewPage.size;
  }
  public set PageSize(value) {
    this.appParameter.currentItem.viewPage.size = value;
  }
  // 是否存在多选数据
  public get isMultipleSelectList(): boolean {
    return this.showCheckboxList.length !== 0;
  }
  searchObj = {};
  showCheckboxList: Array<object> = [];
  isVisible = false;
  modalTitle = '添加推荐词';
  // 编辑数据
  modelData: object = {}
  sortTypes = [
    { name: '权重', code: 'recommend_weight' },
    { name: '随机展示', code: 'random' },
    { name: '日期排序', code: 'effect_start_time' },
    { name: '自然排序', code: 'natural' },
  ];
  sortField: ''
  // 父组件中获得子组件的引用
  @ViewChild('Table', { static: false }) Table;
  // 查询
  @ViewChild('AddEdit', { static: false }) AddEdit;
  // 查询
  @ViewChild('Search', { static: false }) SearchSubmit;
  // 展示区域列表
  listOfOption = this.appParameter.option.listOfOption;
  // 发布渠道列表
  listOfChannel = this.appParameter.option.listOfChannel;
  // 添加推荐词置灰控制
  disabled = true;
  // 是否有权限显示
  isSHow = true;

  // ------------------ 自定义函数 ------------------
  // 计算鉴权操作
  validator(callback): void {
    this.validatorAction.getValidator.then(() => {
      const render = this.validatorAction.sort(this.power);
      this.columns = [
        {
          title: '序号',
          key: 'index',
          width: '50px',
          logic: (record, index, text) => {
            return index;
          }
        },
        {
          title: '推荐词',
          key: 'name',
          width: '10%',
        },
        {
          title: '生效区域',
          key: 'region',
          width: '20%',
          hide: true,
        },
        {
          title: '生效时间',
          key: 'effectStartTime',
          width: '15%',
          logic: (record, index, text) => {
            return `${record.effectStartTime} - ${record.effectEndTime}`;
          }
        },
        {
          title: '权重设置',
          key: 'recommendWeight',
          width: '10%',
        },
        {
          title: '展示区域',
          key: 'showArea',
          width: '10%',
          logic: (record, index, text) => {
            return String(record.showArea) ? String(record.areaName) : '全部';
          }
        },
        {
          title: '发布渠道',
          key: 'carouselwordSources',
          width: '10%',
          logic: (record, index, text) => {
            return String(record.carouselwordSources) ? String(record.channelName) : '全部';
          }
        },
        {
          title: '推荐词类型',
          key: 'typeName',
          width: '10%',
        },
        {
          title: '活动链接',
          key: 'carouselwordUrl',
          width: '10%',
        },
        {
          title: '状态',
          key: 'onlineFlag',
          width: '10%',
          logic: (record, index, text) => {
            return record.onlineFlag ? '上线' : '下线';
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: '10%',
          render: [
            ...render,
            {
              name: '修改',
              logic: (record) => {
                return true;
              },
              call: (record) => {
                this.modalTitle = '推荐词语修改设置';
                this.edit(record);
              }
            },
            {
              name: '删除',
              type: 'remind',
              // hide: (record) => {
              //   return record.onlineFlag ? true : false;
              // },
              message: (record) => {
                return `确认要删除 "${record.name}" 吗?`;
              },
              logic: (record) => {
                return true;
              },
              call: (record) => {
                this.setBatchOpt([record.id], 'delete');
              }
            }
          ]
        }];
      callback();
    });
  }

  // 组件初始化
  ngOnInit(): void {
    this.validator(() => {
      this.isTable = true;
      this.getAreaList();
      this.pageDataChange();
    });
  }

  // 页面数据变化
  pageDataChange(): void {
    super.pageDataChange('wordsList', {
      pageNo: this.PageIndex,
      PageSize: this.PageSize,
      ...this.searchObj
    }, (res) => {
      const { retCode, msg, result } = res;
      if (retCode === '00000') {
        const list = result.records || [];
        list.map((item) => {
          if (item.effectAreaVOS.length === 0) {
            item.region = '全国';
          } else {
            const temp = [];
            /* eslint-disable */
            item.effectAreaVOS.forEach(item => {
              if (item.provinceCode === '100000') {
                temp.push(item.provinceName);
              } else {
                temp.push(item.provinceName + item.cityName);
              }
            });
            item.region = String(temp);
          }
          return item;
        });
        this.tableData = list;
        this.pages = result.pages;
        this.current = result.current;
        this.sortField = result.sortType;
      } else {
        this.message.error(msg);
      }
    });
  }
  // 新增 & 批量新增
  newAdd(): void {
    this.modelData = {};
    this.isVisible = true;
  }
  // 编辑
  edit(record): void {
    this.viewAction.get('listDetail', {
      id: record.id
    }, (res) => {
      const { retCode, msg, result } = res;
      if (retCode === '00000') {
        this.modelData = result;
        this.isVisible = true;
      } else {
        this.message.error(msg);
      }
    });
  }
  // 批量操作
  setBatchOpt(ids: Array<any>, type: string): void {
    this.viewAction.set('batchOperate', {
      ids,
      optField: type
    }, (res) => {
      const { retCode, msg } = res;
      if (retCode === '00000') {
        this.message.success('操作成功');
        this.pageDataChange();
      } else {
        this.message.error(msg);
      }
    });
  }
  // 批量删除 | 上线 ｜ 下线
  batchOpt(type: string): void {
    const _ids = this.showCheckboxList.map((check) => {
      return check['id'];
    });
    this.setBatchOpt(_ids, type);
  }
  // 查询提交
  searchSubmitChange(): void {
    this.searchObj = {
      ...this.SearchSubmit.searchInfo,
    };
    this.pageDataChange();
  }
  pageSizeChange(): void {
    this.PageIndex = 0;
    this.pageDataChange();
  }
  // 列表选择时的回调
  pageCheckChange(ev): void {
    this.showCheckboxList = ev;
  }
  // 新增编辑-取消
  handleCancel() {
    this.isVisible = false;
  }
  // 新增编辑-确定
  handleOk() {
    this.AddEdit.submitForm();
  }
  // 提升性能
  trackByFn(index, item): any {
    return index; // or item.id
  }
  // 排序切换
  sortChange(value: string): void {
    this.viewAction.set('updateSortField', {
      sortField: value
    }, (res) => {
      const { retCode, msg } = res;
      if (retCode === '00000') {
        this.message.success('更改成功');
      } else {
        this.message.error(msg);
      }
    });
  }
  // 新增编辑热词成功
  editSubmitChange(): void {
    // 刷新列表
    this.PageIndex = 0;
    this.pageDataChange();
    this.isVisible = false;
    this.message.success('操作成功');
  }
  // 获取省市list数据
  async getAreaList() {
    this.disabled = true;
    // regionType  = 0（省级）  regionType = 1（市级）
    await this.viewAction.get('regionList', {
      regionType: 0,
    }, (res) => {
      const { retCode, msg, result } = res;
      if (retCode === '00000') {
        this.appParameter.option.provinceList = result;
      } else {
        this.message.error(msg);
      }
    });

    // 获取展示区域下拉数据
    await this.viewAction.get('dropList', (res) => {
      const { retCode, msg, result } = res;
      if (retCode === '00000') {
        this.appParameter.option.listOfOption = ArrayIndex({
          array: result,
          indexs: [
            {
              key: 'id',
              value: 'name',
            },
          ],
        });
        this.listOfOption = this.appParameter.option.listOfOption;
      } else {
        this.message.error(msg);
      }
    });
    // 获取发布渠道展示数据
    await this.viewAction.get('queryChannelByTenant', (res) => {
      const { retCode, msg, result } = res;
      if (retCode === '00000') {
        this.appParameter.option.listOfChannel = ArrayIndex({
          array: result,
          indexs: [
            {
              key: 'id',
              value: 'name',
            },
          ],
        });
      } else {
        this.message.error(msg);
      }
    });

    this.disabled = false;
  }

  ngOnDestroy() {
    // 页面销毁时，清除定时器
    clearInterval(this.appParam.SI);
  }
}