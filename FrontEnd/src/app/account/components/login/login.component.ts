import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthSubjectService } from 'src/app/shared/services/auth-subject/auth-subject.service';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  toggle: boolean = false;
  private Login: Subscription;

  constructor(
    private authService: AccountService,
    private toastr: ToastrService,
    private authSubjectService: AuthSubjectService,
    private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
  }

  login() {
    const token = localStorage.getItem('token');
    if (token != undefined && token != null && token != "") {
      return this.toastr.warning('You are already login', 'Warning')
    }
    this.toggle = true;
    this.Login = this.authService.Login(this.loginForm.value)
      .subscribe(response => {
        this.toggle = false;
        if (response.errorHappen == true) {
            this.toastr.error(response.message, 'Validation Error!');
        }
        else {
          this.toastr.success('Sign in done successfully', 'Success');
          localStorage.setItem('token', response.token);
          localStorage.setItem('abilitiesIds', response.abilitiesIds);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('userEmail', response.userEmail);
          localStorage.setItem('abilitiesIds', response.abilitiesIds);
          this.authSubjectService.next({abilitiesIds: response.abilitiesIds, name: response.userName, email: response.userEmail});
          this.router.navigateByUrl('/admin/holidays');
        }
      })
  }

  ngOnDestroy() {
    this.Login?.unsubscribe();
  }

}
