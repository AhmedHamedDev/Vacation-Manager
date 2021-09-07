import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../services/roles.service';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  @ViewChild("content") content;
  closeResult = '';
  model: NgbDateStruct;
  toggle: boolean = false;

  constructor( private rolesGridComp: RolesComponent, private modalService: NgbModal, private rolesService: RolesService,  private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  roleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() { return this.roleForm.get('name'); }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addRole(){
    this.rolesService.AddRole(this.roleForm.value, localStorage.getItem('token')).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.rolesGridComp.addRow(response.roleId, this.roleForm.value.name);
      }
      this.modalService.dismissAll('Save click');
    })
  }

}
