import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemComponent as AdminItemComponents } from './admin/item/item.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    {
        path:"items",
        component:ItemComponent,
        pathMatch:"full"
    },
    {
        path:'home',
        component:HomeComponent,
        pathMatch:"full"
    },
    {
        path:'',redirectTo:'/home',pathMatch:"full"
    },
    {
        path:'signin',
        component:SignInComponent
        ,pathMatch:"full"
    },
    {
        path:'signup',
        component:SignUpComponent
        ,pathMatch:"full"
    },
    {
        path:"admin/items",
        component:AdminItemComponents
    }
];
