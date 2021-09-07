import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard/auth-guard.service';
import { CalculationsComponent } from '../user/components/calculations/calculations.component';
import { UserCheckInsComponent } from '../user/components/user-check-ins/user-check-ins.component';
import { VacationsComponent } from '../user/components/vacations/vacations.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'users', canActivate: [AuthGuardService], component: UsersComponent },
  { path: 'user-checkins/:id', canActivate: [AuthGuardService], component: UserCheckInsComponent },
  { path: 'holidays', canActivate: [AuthGuardService], component: HolidaysComponent },
  { path: 'user-vacations/:id', canActivate: [AuthGuardService], component: VacationsComponent },
  { path: 'user-calculations/:id', canActivate: [AuthGuardService], component: CalculationsComponent },
  { path: 'roles', canActivate: [AuthGuardService], component: RolesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
