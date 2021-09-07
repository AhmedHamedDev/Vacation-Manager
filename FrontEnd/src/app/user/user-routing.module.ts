import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard/auth-guard.service';
import { CalculationsComponent } from './components/calculations/calculations.component';
import { UserCheckInsComponent } from './components/user-check-ins/user-check-ins.component';
import { VacationsComponent } from './components/vacations/vacations.component';


const routes: Routes = [
  { path: 'checkins', canActivate: [AuthGuardService], component: UserCheckInsComponent },
  { path: 'vacations', canActivate: [AuthGuardService], component: VacationsComponent },
  { path: 'calculations', canActivate: [AuthGuardService], component: CalculationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
