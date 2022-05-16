// 主库
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 富文本组件
import { FroalaEditorComponent } from './froalaEditor.component';
// 图片裁剪
import { APPCropperComponent } from './cropper/app.cropper.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
/* 富文本 */
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
    declarations: [
        FroalaEditorComponent,
        APPCropperComponent
    ],
    imports: [
        NzModalModule,
        CommonModule,
        ImageCropperModule,
        NzButtonModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    exports: [
        FroalaEditorComponent,
        NzButtonModule,
        ],
  })
export class AppFroalaEditorModule {}
