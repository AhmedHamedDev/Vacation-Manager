import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { VacationStatus } from 'src/app/shared/enums/VacationStatus';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { VacationService } from '../../services/vacation.service';
import { VacationsComponent } from '../vacations/vacations.component';

@Component({
  selector: 'app-btn-delete-vacation',
  templateUrl: './btn-delete-vacation.component.html',
  styleUrls: ['./btn-delete-vacation.component.css']
})
export class BtnDeleteVacationComponent implements OnInit {


  public params: any;
  abilities: number[];
  Abilities = Abilities;
  
  constructor(private route: ActivatedRoute, private vacationsComponent: VacationsComponent, private vacationService: VacationService, private toastr: ToastrService, private authSubjectService: AuthSubjectService) { }

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

  deleteVacation(){
    this.vacationService.DeleteVacation(this.params.data.id, localStorage.getItem("token")).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.vacationsComponent.deleteRow(this.params.data.id);
      }
    })
  }

  approveVacation(){
    const id = this.route.snapshot.paramMap.get('id');
    this.vacationService.ChangeVacationStatus(this.params.data.id, VacationStatus.Approved, localStorage.getItem("token")).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.vacationsComponent.changeStatus("Approved",this.params.data.id);
      }
    })
  }

  denyVacation(){
    const id = this.route.snapshot.paramMap.get('id');
    this.vacationService.ChangeVacationStatus(this.params.data.id, VacationStatus.Denied , localStorage.getItem("token")).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.vacationsComponent.changeStatus("Denied",this.params.data.id);
      }
    })
  }
}
