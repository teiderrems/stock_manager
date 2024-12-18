import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { samevalueValidator, SameValueValidatorDirective } from './samevaluevalidator.directive';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { RegisterAction, ResetBooleanField } from '../../../state/auth/auth.actions';
import { AuthState } from '../../../state/auth/auth.state';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NzFormModule,NzIconModule,ReactiveFormsModule,FormsModule,RouterLink,NzCardModule,NzInputModule,NzButtonModule,SameValueValidatorDirective,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
    this.store.dispatch(ResetBooleanField);
  }
  private store=inject(Store);
  private router=inject(Router);

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);
  
  isSubmit=signal(false);
  authState=this.store.selectSignal(AuthState.getState);
  
  isSuccess=this.store.selectSignal(AuthState.isSuccess);
  isError=this.store.selectSignal(AuthState.isError);

  submitForm(): void {
    console.log(this.authState());
    if (this.register.valid) {

      this.store.dispatch(ResetBooleanField);
      this.store.dispatch(new RegisterAction({email:this.register.value.email!,password:this.register.value.password!}))
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
  register:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email,Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirm: new FormControl('', [Validators.required,Validators.minLength(8)]),
},[samevalueValidator]);
}
