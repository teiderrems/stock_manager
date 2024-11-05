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
import { matchRouteGuard } from './account/auth/match-route.guard';

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
        },
        title:"Item Page"
    },
    {
        path:"items/:itemId/comments",
        component:CommentComponent,
        pathMatch:"full",
        data: {
            breadcrumb: 'Comments'
        },
        title:"Comment Page"
    },
    {
        path:'home',
        component:HomeComponent,
        pathMatch:"full",
        data: {
            breadcrumb: 'Home'
        },
        title:"Home Page"
    },
    {
        path:'login',
        component:LoginComponent
        ,pathMatch:"full",
        data: {
            breadcrumb: 'Login'
        },
        // canMatch:[matchRouteGuard],
        title:"Login Page",
        canActivate:[isAdminOrGuestGuard]
    },
    {
        path:'register',
        component:RegisterComponent
        ,pathMatch:"full",
        data: {
            breadcrumb: 'Register'
        },
        // canMatch:[matchRouteGuard],
        title:"Register Page",
        canActivate:[isAdminOrGuestGuard]
    },
    {
        path:"admin/items",
        component:AdminItemComponents,
        data: {
            breadcrumb: 'AdminItems'
        },
        pathMatch:'full',
        title:"AdminItem Page"
    },
    {
        path:"admin/users",
        component:UserComponent,
        data: {
            breadcrumb: 'Users'
        },
        pathMatch:'full',
        canActivate:[isAdminOrGuestGuard],
        title:"User Page"
    },
    {
        path:"reset-password",
        component:ResetPasswordComponent,
        data: {
            breadcrumb: 'ResetPassword'
        },
        pathMatch:'full',
        title:"Reset Password Page"
    },
    {
        path:'**',
        component:NotfoundComponent,
        title:"404 Page"
    }
];
