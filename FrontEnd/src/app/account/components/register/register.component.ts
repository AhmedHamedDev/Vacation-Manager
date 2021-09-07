import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  toggle:boolean = false;
  private Register: Subscription;

  constructor(
    private authService: AccountService,
    private toastr: ToastrService, 
    private router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, this.pwdMatchValidator);

  get username() {return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


  ngOnInit(): void {
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  register() {
    this.toggle = true;
    this.registerForm.value.gender = Number.parseInt(this.registerForm.value.gender);
    this.Register = this.authService.Register(this.registerForm.value)
      .subscribe(response => {
        this.toggle = false;
        if (response.errorHappen == true) {
            this.toastr.error(response.message, 'Validation Error!');
        }
        else {
          this.toastr.success('Register done successfully', 'Success');
          this.router.navigateByUrl('/account/login');
        }
      })
  }

  ngOnDestroy() {
    this.Register?.unsubscribe();
  }

}
