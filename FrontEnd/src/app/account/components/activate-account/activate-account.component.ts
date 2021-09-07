import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  showSuccessMessage: boolean = null;

  constructor(private toastr: ToastrService, private router: Router, private accountService: AccountService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.accountService.ActivateAccount(params['token']).subscribe(response => {
        if (response.errorHappen == true){
          this.toastr.error(response.message, "Sorry :(")
          this.showSuccessMessage = false
        }
        else if (response.errorHappen == false){
          this.toastr.success(response.message, "Done")
          this.showSuccessMessage = true
        }
      })
    });

  }

}
