import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store';
import { ItemState } from '../state/item/item.state';
import { AuthState } from '../state/auth/auth.state';
import { CommentState } from '../state/comment/comment.state';
import { CategorieState } from '../state/categorie/categorie.state';
import { PictureState } from '../state/picture/picture.state';
import { responseInterceptor } from '../../_interceptors/response.interceptor';
import { requestInterceptor } from '../../_interceptors/request.interceptor';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { RoleState } from '../state/role/role.state';
import { UserState } from '../state/user/user.state';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(),
  withInterceptors([requestInterceptor,responseInterceptor])
  ),
    provideAnimationsAsync(), provideStore([ItemState,AuthState,CommentState,CategorieState,PictureState,RoleState,UserState],
      withNgxsStoragePlugin({
        keys: ['auth']
      }),
    withNgxsReduxDevtoolsPlugin()) 
  ],
};
