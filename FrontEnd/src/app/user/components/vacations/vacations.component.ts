import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Subscription } from 'rxjs';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { VacationService } from '../../services/vacation.service';
import { BtnDeleteVacationComponent } from '../btn-delete-vacation/btn-delete-vacation.component';
import { VacationFormComponent } from '../vacation-form/vacation-form.component';
import { Abilities } from '../../../shared/enums/Abilities'

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {
  gridData: any[];
  private GetUserCheckIns: Subscription;
  private params: Subscription;
  abilities: number[];
  Abilities = Abilities;
  private gridApi;
  frameworkComponents: any;
  @ViewChild(VacationFormComponent) vacationFormComponent: VacationFormComponent;


  constructor(private authSubjectService: AuthSubjectService, private vacationService: VacationService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.GetUserCheckIns?.unsubscribe();
    this.params?.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == undefined || id == null) {
      this.GetUserCheckIns = this.vacationService.GetCurrentUserVacations(localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true) {
          this.toastr.error(response.message, "Sorry :(")
          this.gridData = [];
        }
        else if (response.errorHappen == false)
          this.gridData = response.message;
      })
    }
    else{
      this.GetUserCheckIns = this.vacationService.GetUserVacations(id,localStorage.getItem("token")).subscribe(response => {
        if (response.errorHappen == true) {
          this.toastr.error(response.message, "Sorry :(")
          this.gridData = [];
        }
        else if (response.errorHappen == false)
          this.gridData = response.message;
      })
    }

    this.authSubjectService.getSubject().subscribe(res => {
      this.abilities = res.abilitiesIds;
    })

    this.frameworkComponents = {
      BtnDeleteVacation: BtnDeleteVacationComponent,
    };
  }

  columnDefs = [
    { field: 'date', sortable: true, filter: true, resizable: true, minWidth: 100, wrapText: true },
    { field: 'description', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
    { field: 'status', sortable: true, filter: true, resizable: true, minWidth: 200, wrapText: true },
    { field: "Actions", cellRenderer: "BtnDeleteVacation", minWidth: 500, resizable: true }
  ];

  deleteRow(vacationId: number) {
    this.gridData = this.gridData.filter(x => x.id != vacationId);
  }

  addRow(vacationId: number, description: string, date: string, status: string) {
    this.gridData.push({ id: vacationId, description: description, date: date, status: status })
    this.gridData = this.gridData.map(x => x);
  }

  changeStatus(newStatus: string, vacationId: number){
    this.gridData.find(x=>x.id == vacationId).status = newStatus;
    this.gridData = this.gridData.map(x => x);
  }

  openAddVacation() {
    this.vacationFormComponent.open();
  }
}
