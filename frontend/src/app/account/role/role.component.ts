import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PostRoleAction } from '../../../state/role/role.actions';
import { RoleState } from '../../../state/role/role.state';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule,NzModalModule,NzButtonModule,],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  private readonly store=inject(Store);

  isSuccess=this.store.selectSignal(RoleState.IsSuccess);
  state=this.store.selectSignal(RoleState.getState);

  isVisible =input<boolean>(false);
  close=output();
  handleCancel() {
    this.close.emit();
  }

  PostRole() {

    if (this.role.valid) {
      this.store.dispatch(new PostRoleAction(this.role.getRawValue() as {name:string}));
      if (this.isSuccess()) {
        this.isSubmit.set(false);
        this.close.emit();
      }
    }
    
  }

  isSubmit=signal(false);

  role=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(15)])
  })

}
