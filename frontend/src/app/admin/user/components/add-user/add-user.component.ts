import {
  afterRender,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../../state/auth/auth.state';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RoleState } from '../../../../../state/role/role.state';
import { RoleComponent } from '../../../../account/role/role.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PictureComponent } from '../../../../picture/picture.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoadRoleAction } from '../../../../../state/role/role.actions';
import { PostUserAction, ResetBooleanField } from '../../../../../state/user/user.actions';
import { UserState } from '../../../../../state/user/user.state';
import { PictureService } from '../../../../picture/picture.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzCardModule,
    NzModalModule,
    RoleComponent,
    PictureComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  
})
export class AddUserComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(LoadRoleAction);
  }

  private store = inject(Store);
  private picture = signal(1);
  image = signal<File | undefined>(undefined);
  userState=this.store.selectSignal(UserState.getState);

  isSubmit = signal(false);
  authState = this.store.selectSignal(AuthState.getState);

  roleState = this.store.selectSignal(RoleState.getState);
  isSuccess = this.store.selectSignal(UserState.IsSuccess);

  addRole = signal(false);

  submitForm(): void {

    if (this.image() !== undefined) {
      var formData = new FormData();
      formData.append('picture', this.image()!, this.image()?.name);
      this.pictureService
        .addPicture(formData)
        .pipe(
          tap((value) => {
            return value;
          }),
          catchError(async (error) => console.error(error.message))
        )
        .subscribe((value) => {

          if (this.register.valid) {
            this.store.dispatch(
              new PostUserAction({
                ...this.register.getRawValue(),
                pictureId: value??this.picture(),
              })
            ).subscribe(()=>{
                this.isSubmit.set(false);
                this.close.emit();
            });
          }
        });
        this.store.dispatch(ResetBooleanField);
    }
    
  }
  register: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    roles: new FormControl([]),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });

  isVisible = input<boolean>(false);
  close = output();

  isOkLoading = false;

  handleOk(): void {
    this.isOkLoading = true;
    this.close.emit();
  }

  updateImage($event: File | undefined) {
    console.log($event);
    this.image.set($event);
  }
  updatePicture(id: number) {
    this.picture.set(id);
  }
  handleCancel(): void {
    this.close.emit();
  }

  constructor(private readonly pictureService: PictureService) {
    
  }
}
