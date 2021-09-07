import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Abilities } from 'src/app/shared/enums/Abilities';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { RolesService } from '../../services/roles.service';
import { RoleActionsComponent } from '../role-actions/role-actions.component';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {


  gridData: any[];
  private gridApi;
  frameworkComponents: any;
  private GetRoles: Subscription;
  abilities: number[];
  Abilities = Abilities;
  @ViewChild(RoleFormComponent) roleFormComponent: RoleFormComponent;

  constructor(private rolesService: RolesService, private toastr: ToastrService,  private authSubjectService: AuthSubjectService) { }
  
  ngOnDestroy(): void {
    this.GetRoles?.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
      this.GetRoles = this.rolesService.GetRoles(localStorage.getItem("token")).subscribe(response => {
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
        RoleActionsComponent: RoleActionsComponent,
      };
  }

  columnDefs = [
    { field: 'roleName', sortable: true, filter: true, resizable: true, minWidth: 100, wrapText: true },
    { field: "Actions", cellRenderer: "RoleActionsComponent", minWidth: 500, resizable: true }
  ];

  deleteRow(roleId: number){
    this.gridData = this.gridData.filter(x=>x.roleId != roleId);
  }

  addRow(roleId: number, name: string){
    debugger
    this.gridData.push({ roleId: roleId, roleName: name })
    this.gridData = this.gridData.map(x=>x);
  }

  openAddRole(){
    this.roleFormComponent.open();
  }

}
