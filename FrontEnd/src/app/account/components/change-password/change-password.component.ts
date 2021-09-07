import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  toggle: boolean = false;
  private changePasswordSub: Subscription;

  constructor(
    private authService: AccountService,
    private toastr: ToastrService) { }

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  }, this.pwdMatchValidator);

  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('newPassword').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  ngOnInit(): void {
  }

  changePassword() {
    const token = localStorage.getItem('token');
    this.toggle = true;
    this.changePasswordSub = this.authService.ChangePassword(this.changePasswordForm.value, token)
      .subscribe(response => {
        this.toggle = false;
        if (response.errorHappen == true) {
            this.toastr.error(response.message, 'Validation Error!');
        }
        else {
          this.toastr.success(response.message, 'Success');
        }
      })
  }

  ngOnDestroy() {
    this.changePasswordSub?.unsubscribe();
  }
}
