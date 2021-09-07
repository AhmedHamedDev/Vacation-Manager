import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ActivateAccountComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
     ReactiveFormsModule
  ]
})
export class AccountModule { }
