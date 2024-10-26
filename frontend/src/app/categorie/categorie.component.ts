import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CategorieState } from '../../state/categorie/categorie.state';
import { PostCategorieAction } from '../../state/categorie/categorie.actions';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [NzModalModule,ReactiveFormsModule,NzInputModule,NzButtonModule,],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {


  private store=inject(Store);
isSuccess=this.store.selectSignal(CategorieState.IsSuccess);

PostCategorie() {
  if (this.categorie.valid) {
    this.store.dispatch(new PostCategorieAction(this.categorie.value));
    if (this.isSuccess()) {
      this.isSubmit.set(true);
      this.close.emit();
    }
  }
}

isVisible =input<boolean>(false);

handleCancel() {
  this.close.emit();
}
showModal() {
throw new Error('Method not implemented.');
}

close=output();

isSubmit=signal(false);

  categorie=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.maxLength(15)]),
    description:new FormControl("")
  });

}
