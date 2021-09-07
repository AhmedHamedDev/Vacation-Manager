import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { AgGridModule } from 'ag-grid-angular';
import { BtnViewCheckinsComponent } from './components/btn-view-checkins/btn-view-checkins.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { BtnDeleteHolidayComponent } from './components/btn-delete-holiday/btn-delete-holiday.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './components/roles/roles.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleActionsComponent } from './components/role-actions/role-actions.component';


@NgModule({
  declarations: [UsersComponent, BtnViewCheckinsComponent, HolidaysComponent, BtnDeleteHolidayComponent, HolidayFormComponent, RolesComponent, RoleFormComponent, RoleActionsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule.withComponents([]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
