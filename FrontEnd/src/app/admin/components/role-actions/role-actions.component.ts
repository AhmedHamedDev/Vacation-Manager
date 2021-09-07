import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { RolesService } from '../../services/roles.service';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-role-actions',
  templateUrl: './role-actions.component.html',
  styleUrls: ['./role-actions.component.css']
})
export class RoleActionsComponent implements OnInit {


  public params: any;
  abilities: number[];
  Abilities = Abilities;
  
  constructor(private rolesGridComp: RolesComponent, private rolesService: RolesService, private toastr: ToastrService, private authSubjectService: AuthSubjectService) { }

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

  deleteRole(){
    this.rolesService.DeleteRole(this.params.data.roleId, localStorage.getItem("token")).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.rolesGridComp.deleteRow(this.params.data.roleId);
      }
    })
  }

}
