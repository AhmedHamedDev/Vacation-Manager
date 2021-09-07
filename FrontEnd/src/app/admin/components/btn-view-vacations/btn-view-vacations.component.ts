import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-view-vacations',
  templateUrl: './btn-view-vacations.component.html',
  styleUrls: ['./btn-view-vacations.component.css']
})
export class BtnViewVacationsComponent implements OnInit {


  public params: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
      return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
      
  }

  viewUserVacations(){
    this.router.navigateByUrl('/admin/user-vacations/'+this.params.data.id);
  }

}
