import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CheckInData } from 'src/app/shared/models/CheckInData';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-check-ins',
  templateUrl: './user-check-ins.component.html',
  styleUrls: ['./user-check-ins.component.css']
})
export class UserCheckInsComponent implements OnInit, OnDestroy {

  gridData: CheckInData[];
  private GetUserCheckIns: Subscription;
  private params: Subscription;

  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.GetUserCheckIns?.unsubscribe();
    this.params?.unsubscribe();
  }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id == undefined || id == null){
        this.GetUserCheckIns = this.userService.GetCurrentUserCheckIns(localStorage.getItem("token")).subscribe(response => {
          if (response.errorHappen == true){
            this.toastr.error(response.message, "Sorry :(")
            this.gridData = [];
          }
          else if (response.errorHappen == false)
            this.gridData = response.message;
        })
      }
      else{
        this.GetUserCheckIns = this.userService.GetUserCheckIns(id,localStorage.getItem("token")).subscribe(response => {
          if (response.errorHappen == true){
            this.toastr.error(response.message, "Sorry :(")
            this.gridData = [];
          }
          else if (response.errorHappen == false)
            this.gridData = response.message;
        })
      }
   

  }

  columnDefs = [
    { field: 'date', sortable: true, filter: true, resizable: true, minWidth: 100, wrapText: true },
    { field: 'time', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
    { field: 'day', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
  ];
}
