import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthState } from '../../../state/auth/auth.state';
import { ResetPasswordAction } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,NzCardModule,NzInputModule,NzIconModule,NzButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent{
  

  @Input("resetCode")
  set resetCode(resetCode:string){
    this.resetPassword.patchValue({resetCode:resetCode});
  }

  @Input("email")
  set email(email:string){
    this.resetPassword.patchValue({email:email});
  }

  resetPassword=new FormGroup({
    email:new FormControl("",[Validators.email]),
    resetCode:new FormControl(""),
    newPassword:new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  });

  store=inject(Store);

  router=inject(Router);
  isSuccess=this.store.selectSignal(AuthState.isSuccess);

  isSubmit=signal<boolean>(false);


  ResetPassword(){

    if (this.resetPassword.valid) {

      this.store.dispatch(new ResetPasswordAction(
        {email:this.resetPassword.getRawValue().email!,
          resetCode:this.resetPassword.getRawValue().resetCode!,
          newPassword:this.resetPassword.getRawValue().newPassword!}));
      if (this.isSuccess()) {
        this.isSubmit.set(false);
        this.router.navigateByUrl('/login');
      }
    }
  }

  passwordVisible=signal<boolean>(false);

}
