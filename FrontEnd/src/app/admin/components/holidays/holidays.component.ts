import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { AdminService } from '../../services/admin.service';
import { BtnDeleteHolidayComponent } from '../btn-delete-holiday/btn-delete-holiday.component';
import { HolidayFormComponent } from '../holiday-form/holiday-form.component';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit, OnDestroy {


  gridData: any[];
  private gridApi;
  frameworkComponents: any;
  private GetHolidays: Subscription;
  abilities: number[];
  Abilities = Abilities;
  @ViewChild(HolidayFormComponent) holidayFormComponent: HolidayFormComponent;

  constructor(private adminService: AdminService, private toastr: ToastrService,  private authSubjectService: AuthSubjectService) { }
  
  ngOnDestroy(): void {
    this.GetHolidays?.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
      this.GetHolidays = this.adminService.GetHolidays(localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true){
          this.toastr.error(response.message, "Sorry :(")
          this.gridData = [];
        }
        else if (response.errorHappen == false)
          this.gridData = response.message;
      })

      this.authSubjectService.getSubject().subscribe(res => {
        this.abilities = res.abilitiesIds;
      })

      this.frameworkComponents = {
        BtnDeleteHoliday: BtnDeleteHolidayComponent,
      };
  }

  columnDefs = [
    { field: 'name', sortable: true, filter: true, resizable: true, minWidth: 100, wrapText: true },
    { field: 'date', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
    { field: "Actions", cellRenderer: "BtnDeleteHoliday", minWidth: 500, resizable: true }
  ];

  deleteRow(holidayId: number){
    this.gridData = this.gridData.filter(x=>x.id != holidayId);
  }

  addRow(holidayId: number, name: string, date: string){
    this.gridData.push({ id: holidayId, name: name, date: date })
    this.gridData = this.gridData.map(x=>x);
  }

  openAddHoliday(){
    this.holidayFormComponent.open();
  }

}
