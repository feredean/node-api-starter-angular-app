import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './core/app-layout/app-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('src/app/recovery/recovery.module').then(m => m.RecoveryModule)
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/hello/hello.module').then(m => m.HelloModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'users',
        loadChildren: () => import('src/app/users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
