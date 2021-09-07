import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VacationService } from '../../services/vacation.service';
import { VacationsComponent } from '../vacations/vacations.component';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.css']
})
export class VacationFormComponent implements OnInit {

  @ViewChild("content") content;
  closeResult = '';
  model: NgbDateStruct;
  toggle: boolean = false;

  constructor(private parserFormatter: NgbDateParserFormatter, private vacationComponent: VacationsComponent, private modalService: NgbModal, private vacationService: VacationService,  private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  vacationForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    vacationDate: new FormControl('', [Validators.required]),
  });

  get description() { return this.vacationForm.get('description'); }
  get vacationDate() { return this.vacationForm.get('vacationDate'); }

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

  addVacation(){
    this.vacationForm.value.vacationDate =  this.parserFormatter.format(this.vacationForm.value.vacationDate ); 
    this.vacationService.AddVacation(this.vacationForm.value.description, this.vacationForm.value.vacationDate, localStorage.getItem('token')).subscribe(response => {
      if (response.errorHappen == true){
        this.toastr.error(response.message, "Sorry :(")
      }
      else if (response.errorHappen == false){
        this.toastr.success(response.message, "Done")
        this.vacationComponent.addRow(response.holidayId, this.vacationForm.value.description, this.vacationForm.value.vacationDate, "Pending");
      }
      this.modalService.dismissAll('Save click');
    })
  }

}
