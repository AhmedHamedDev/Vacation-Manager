import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NotAuthorizedComponent } from './shared/components/not-authorized/not-authorized.component';


const routes: Routes = [
  { path:'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  { path:'user', loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule)},
  { path:'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)},
  { path:'not-authorized', component: NotAuthorizedComponent},
  { path:'404', component: NotFoundComponent},
  { path:'**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
