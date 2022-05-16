
验证服务

## 何时使用

form 表单验收时添加可选验证方法

## 单独引入此组件

```ts
import { * } from 'verify.services';
```

## API

### 数字类型验证
| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|----|
| mobileVerify      | 手机号码正则 | function | - |
| numberVerify      | 正整数 | function | - |
| numberRangeVerify       | 正数范围 | function | - |
| priceVerify      | 价格 | function | - |
| sizeVerify        | 安装包大小 | function | - |

#### 字符串类型验证

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|----|
| rangeVerify      | 文本范围 | function | - |
| limitVerify      | 以**开始并限制长度 | function | - |
| emptyVerify       | 空提醒 | function | - |
| noNumberVerify      | 不包含数字 | function | - |
| lengthVerify        | 长度限制 | function | - |
| noChineseVerify        | 不允许输入中文 | function | - |

#### 组合类型验证

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|----|
| characterVerify      | 由N位中文、英文、数字组成 | function | - |
| versionVerify      | 版本 | function | - |
| flagVerify       | 标识 由数字、字母、下划线组成的字符串 | function | - |
| JSONVerify      | JSON | function | - |
| urlVerify        | url | function | - |
| emailVerify        | email | function | - |


### [nzModalFooter]

另一种自定义页脚按钮的方式。

```html
<div *nzModalFooter>
  <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
  <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
</div>

<!-- or -->

<ng-template [nzModalFooter]>
  <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
  <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
</ng-template>
```