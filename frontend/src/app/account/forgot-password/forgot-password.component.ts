import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ForgotPasswordAction } from '../../../state/auth/auth.actions';
import { AuthState } from '../../../state/auth/auth.state';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,NzButtonModule,NzModalModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  isVisible=input<boolean>(false);
  isSubmit=signal<boolean>(false);

  store=inject(Store);

  router=inject(Router);

  close=output();
  isSuccess=this.store.selectSignal(AuthState.isSuccess);

  forget=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email])
  });

  handleCancel() {
    this.close.emit();
  }

  ForgetPassword(){
    if (this.forget.valid) {

      this.store.dispatch(new ForgotPasswordAction(this.forget.value.email!))
      .pipe(
        tap(value=>value),
        catchError(error=>of(error))
      ).subscribe(value=>{
        console.log(value);
      })
      ;
      if (this.isSuccess()) {

        this.isSubmit.set(false);
        this.close.emit();
        this.router.navigateByUrl("/reset-password");
      
      }

    }
  }

}
