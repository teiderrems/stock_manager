import { afterRender, Component, computed, inject, input,OnInit,output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { PictureComponent } from "../../../picture/picture.component";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Store } from '@ngxs/store';
import { LoadCategorieAction } from '../../../../state/categorie/categorie.actions';
import { CategorieState } from '../../../../state/categorie/categorie.state';
import { PostItemAction } from '../../../../state/item/item.actions';
import { ItemState } from '../../../../state/item/item.state';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategorieComponent } from "../../../categorie/categorie.component";
import { PictureState } from '../../../../state/picture/picture.state';
import { PictureService } from '../../../picture/picture.service';
import { catchError, concatMap, map, tap } from 'rxjs';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [NzModalModule,NzMessageModule, NzIconModule, NzSelectModule, NzFormModule, NzButtonModule, ReactiveFormsModule, NzInputModule, NzDatePickerModule, NzInputNumberModule, PictureComponent, CategorieComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit{


  private store=inject(Store);
  id=this.store.selectSignal(PictureState.getPicture);
  isSuccess=this.store.selectSignal(ItemState.IsSuccess);
  private picture=signal(0);

  image=signal<File | undefined>(undefined);


  updateImage($event: File|undefined) {

    this.image.set($event);
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  constructor( private readonly pictureService:PictureService, private readonly messageSertvice:NzMessageService){
    afterRender({
      read:()=>{
        if (this.image()!==undefined) {
          var formData=new FormData();
          formData.append("picture",this.image()!,this.image()?.name);
          this.pictureService.addPicture(formData).pipe(
            tap(value=>{
              return value;
            }),
            catchError(async (error) => console.error(error.message))
          ).subscribe(value=>{
            this.picture.set(value!);
          }
          )
      }
    }
    })
  }

  categorieLength=computed(()=>this.categorieState().categories.length);

  startShowMessages(): void {
    this.messageSertvice
      .loading('Action in progress', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this.messageSertvice.success('Loading finished', { nzDuration: 2500,nzAnimate:this.isSubmit() }).onClose!),
        concatMap(() => this.messageSertvice.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }

  

  addCategorie=signal<boolean>(false);

  categorieState=this.store.selectSignal(CategorieState.getState);

  isError=this.store.selectSignal(ItemState.IsError);

  loadCategories(){
    this.store.dispatch(LoadCategorieAction);
  }

updatePicture(id: number) {
  
  this.picture.set(id);
}


  PostItem() {
      
      if (this.item.valid &&this.picture()!=undefined && this.picture()>0) {
        // this.startShowMessages();
        this.store.dispatch(new PostItemAction({...this.item.value,picture:this.picture()})).subscribe(value=>{
          console.log(value);
          this.isSubmit.set(false);
          this.close.emit();
        });
        
      }
      this.isSubmit.set(false);
  }

  isSubmit=signal(false);

  isVisible =input<boolean>(false);

  item=new FormGroup({
    name:new FormControl<string | any>(""),
    description:new FormControl<string | any>(""),
    categories:new FormControl<number[] | any>([]),
    expirationAt:new FormControl<Date |any>(Date.now),
    stockQuantity:new FormControl<number | any>(0),
    minPrice:new FormControl<number | any>(0),
    maxPrice:new FormControl<number | any>(0),
  })

  close=output();

  isOkLoading = false;

  handleOk(): void {
    this.isOkLoading = true;
    this.close.emit();
  }

  handleCancel(): void {
    this.close.emit();
  }
}
