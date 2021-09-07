import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit {

  private CurrentUserCheckInsCalculations: Subscription;
  userCheckinsCount;
  userVacationsCount;
  holidaysCount;
  margin;
  remaining;
  remainingVacationsCount;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == undefined || id == null) {
      this.CurrentUserCheckInsCalculations = this.userService.CurrentUserCheckInsCalculations(localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true) {
          this.toastr.error(response.message, "Sorry :(")
        }
        else if (response.errorHappen == false) {
          this.userCheckinsCount = response.userCheckinsCount;
          this.userVacationsCount = response.userVacationsCount;
          this.holidaysCount = response.holidaysCount;
          this.margin = response.margin;
          this.remainingVacationsCount = response.remainingVacationsCount;
        }
      })
    }
    else {
      this.CurrentUserCheckInsCalculations = this.userService.UserCheckInsCalculations(id,localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true) {
          this.toastr.error(response.message, "Sorry :(")
        }
        else if (response.errorHappen == false) {
          this.userCheckinsCount = response.userCheckinsCount;
          this.userVacationsCount = response.userVacationsCount;
          this.holidaysCount = response.holidaysCount;
          this.margin = response.margin;
          this.remainingVacationsCount = response.remainingVacationsCount;
        }
      })
    }
  }

}
