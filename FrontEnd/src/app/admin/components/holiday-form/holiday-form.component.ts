import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { HolidaysComponent } from '../holidays/holidays.component';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent implements OnInit {

  @ViewChild("content") content;
  closeResult = '';
  model: NgbDateStruct;
  toggle: boolean = false;

  constructor(private parserFormatter: NgbDateParserFormatter, private holidaysGridComp: HolidaysComponent, private modalService: NgbModal, private adminService: AdminService,  private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  holidayForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    holidayDate: new FormControl('', [Validators.required]),
  });

  get name() { return this.holidayForm.get('name'); }
  get holidayDate() { return this.holidayForm.get('holidayDate'); }

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

  addHoliday(){
    this.holidayForm.value.holidayDate =  this.parserFormatter.format(this.holidayForm.value.holidayDate ); 
    this.adminService.AddHoliday(this.holidayForm.value, localStorage.getItem('token')).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.holidaysGridComp.addRow(response.holidayId, this.holidayForm.value.name, this.holidayForm.value.holidayDate);
      }
      this.modalService.dismissAll('Save click');
    })
  }
}
