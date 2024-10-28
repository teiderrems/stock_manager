import { Component, inject, signal } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../../state/auth/auth.actions';
import { AuthState } from '../../../state/auth/auth.state';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzFormModule, NzIconModule, NzInputModule, ReactiveFormsModule, RouterLink, NzCardModule, NzButtonModule, FormsModule, ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private store=inject(Store);
  login=new FormGroup({
    email:new FormControl("",[Validators.email,Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)])
  });

  open=signal(false);

  private router=inject(Router);

  authState=this.store.selectSignal(AuthState.getState);

  isSubmit=signal(false);

  passwordVisible = signal(false);
  submitForm(): void {

    if (this.login.valid) {

      this.store.dispatch(new LoginAction({email:this.login.value.email!,password:this.login.value.password!}))
      .subscribe(value=>{
        this.isSubmit.set(false);
        this.router.navigateByUrl("/items");
      });
    }

  }

}
