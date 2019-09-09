import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './core/app-layout/app-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import("src/app/login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import("src/app/register/register.module").then(m => m.RegisterModule)
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import("src/app/hello/hello.module").then(m => m.HelloModule)
      },
      // {
      //   path: 'mini-game',
      //   loadChildren: () => import().then()
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
