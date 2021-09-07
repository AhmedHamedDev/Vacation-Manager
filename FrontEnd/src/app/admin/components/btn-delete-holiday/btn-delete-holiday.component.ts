import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { AdminService } from '../../services/admin.service';
import { HolidaysComponent } from '../holidays/holidays.component';

@Component({
  selector: 'app-btn-delete-holiday',
  templateUrl: './btn-delete-holiday.component.html',
  styleUrls: ['./btn-delete-holiday.component.css']
})
export class BtnDeleteHolidayComponent implements OnInit {

  public params: any;
  abilities: number[];
  Abilities = Abilities;
  
  constructor(private holidaysGridComp: HolidaysComponent, private adminService: AdminService, private toastr: ToastrService, private authSubjectService: AuthSubjectService) { }

  ngOnInit(): void {
    this.authSubjectService.getSubject().subscribe(res => {
      this.abilities = res.abilitiesIds;
    })
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
      return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
      
  }

  deleteHoliday(){
    this.adminService.DeleteHoliday(this.params.data.id, localStorage.getItem("token")).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.holidaysGridComp.deleteRow(this.params.data.id);
      }
    })
  }
}
