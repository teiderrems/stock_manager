import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ItemComponent as AdminItemComponents } from './admin/item/item.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { UserComponent } from './admin/user/user.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { CommentComponent } from './comment/comment.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { isAdminOrGuestGuard } from './account/auth/is-admin-or-guest.guard';
// import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    {
        path:"",redirectTo:'/home',pathMatch:"full"
    },
    {
        path:"items",
        component:ItemComponent,
        pathMatch:"full",
        data: {
            breadcrumb: 'Items'
        }
    },
    {
        path:"items/:itemId/comments",
        component:CommentComponent,
        pathMatch:"full",
        data: {
            breadcrumb: 'Comments'
        }
    },
    {
        path:'home',
        component:HomeComponent,
        pathMatch:"full",
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path:'login',
        component:LoginComponent
        ,pathMatch:"full",
        data: {
            breadcrumb: 'Login'
        }
    },
    {
        path:'register',
        component:RegisterComponent
        ,pathMatch:"full",
        data: {
            breadcrumb: 'Register'
        }
    },
    {
        path:"admin/items",
        component:AdminItemComponents,
        data: {
            breadcrumb: 'AdminItems'
        },
        pathMatch:'full'
    },
    {
        path:"admin/users",
        component:UserComponent,
        data: {
            breadcrumb: 'Users'
        },
        pathMatch:'full',
        // canActivate:[isAdminOrGuestGuard],
    },
    {
        path:"reset-password",
        component:ResetPasswordComponent,
        data: {
            breadcrumb: 'ResetPassword'
        },
        pathMatch:'full'
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
