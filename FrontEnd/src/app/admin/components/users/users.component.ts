import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CheckInData } from 'src/app/shared/models/CheckInData';
import { AdminService } from '../../services/admin.service';
import { BtnViewCheckinsComponent } from '../btn-view-checkins/btn-view-checkins.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {


  gridData: [];
  private gridApi;
  frameworkComponents: any;
  private GetAllOtherUsers: Subscription;

  constructor(private adminService: AdminService, private toastr: ToastrService) { }
  
  ngOnDestroy(): void {
    this.GetAllOtherUsers?.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
      this.GetAllOtherUsers = this.adminService.GetAllOtherUsers(localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true){
          this.toastr.error(response.message, "Sorry :(")
          this.gridData = [];
        }
        else if (response.errorHappen == false)
          this.gridData = response.message;
      })

      this.frameworkComponents = {
        BtnViewCheckins: BtnViewCheckinsComponent,
      };
  }

  columnDefs = [
    { field: 'name', sortable: true, filter: true, resizable: true, minWidth: 100, wrapText: true },
    { field: 'email', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
    { field: "Actions", cellRenderer: "BtnViewCheckins", minWidth: 600, resizable: true },
  ];

}
