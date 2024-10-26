import { Component, inject, output } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { PictureState } from '../../state/picture/picture.state';
import { PostPictureAction } from '../../state/picture/picture.actions';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [NzUploadModule, NzButtonModule, NzIconModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css',
})
export class PictureComponent {
  private store = inject(Store);

  id = this.store.selectSignal(PictureState.getPicture);
  isSuccess = this.store.selectSignal(PictureState.IsSuccess);

  load=output<File| undefined>();

  PostPicture(event: any) {
    console.log(event);

    this.load.emit(event.file as File);
    // if (event.file!== null) {
    //   const formData = new FormData();
    //   formData.append('picture', (event.file as File), event.file.filename);
    //   this.store.dispatch(new PostPictureAction(formData));
    //   if (this.isSuccess()) {
    //     this.upload.emit(this.id());
    //   }
    // }
  }
  upload = output<number | undefined>();

  uploading = false;
  fileList: NzUploadFile[] = [];


  beforeUpload = (file: NzUploadFile): boolean => {
    
    this.fileList = this.fileList.concat(file);
    return false;
  };

}
