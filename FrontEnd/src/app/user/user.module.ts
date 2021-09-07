import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRoutingModule } from './user-routing.module';
import { UserCheckInsComponent } from './components/user-check-ins/user-check-ins.component';
import { AgGridModule } from 'ag-grid-angular';
import { VacationsComponent } from './components/vacations/vacations.component';
import { BtnDeleteVacationComponent } from './components/btn-delete-vacation/btn-delete-vacation.component';
import { VacationFormComponent } from './components/vacation-form/vacation-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculationsComponent } from './components/calculations/calculations.component';


@NgModule({
  declarations: [UserCheckInsComponent, VacationsComponent, BtnDeleteVacationComponent, VacationFormComponent, CalculationsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
