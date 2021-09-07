import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';

@Component({
  selector: 'app-btn-view-checkins',
  templateUrl: './btn-view-checkins.component.html',
  styleUrls: ['./btn-view-checkins.component.css']
})
export class BtnViewCheckinsComponent implements OnInit {

  public params: any;
  abilities: number[];
  Abilities = Abilities;
  
  constructor(private router: Router, private authSubjectService: AuthSubjectService) { }

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

  viewUserCheckins(){
    this.router.navigateByUrl('/admin/user-checkins/' + this.params.data.id);
  }

  viewUserVacations(){
    this.router.navigateByUrl('/admin/user-vacations/'+this.params.data.id);
  }

  viewUserCalculations(){
    this.router.navigateByUrl('/admin/user-calculations/'+this.params.data.id);
  }
}
