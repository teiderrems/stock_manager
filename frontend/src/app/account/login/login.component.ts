import { Component, inject, OnInit, signal } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginAction, ResetBooleanField } from '../../../state/auth/auth.actions';
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
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(ResetBooleanField);
  }

  constructor(){
    // afterRender({
    //   write:()=>{
    //     console.log(this.isError(),this.isSuccess());
    //   }
    // })
  }

  private store=inject(Store);

  login=new FormGroup({
    email:new FormControl("",[Validators.email,Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)])
  });

  open=signal(false);

  private router=inject(Router);

  authState=this.store.selectSignal(AuthState.getState);
  isSuccess=this.store.selectSignal(AuthState.isSuccess);
  isError=this.store.selectSignal(AuthState.isError);

  isSubmit=signal(false);

  passwordVisible = signal(false);

  submitForm(): void {

    if (this.login.valid) {
      
      
      this.store.dispatch(new LoginAction({email:this.login.value.email!,password:this.login.value.password!}))
      .subscribe(value=>{
        console.log(this.isSuccess());
        if (this.isSuccess()) {
          
          this.router.navigateByUrl("/items");
        }
        else if (this.isError()) {
          console.log("Error");
        }
        this.isSubmit.set(false);
        // this.store.dispatch(ResetBooleanField);
      });
    }
  }

}
