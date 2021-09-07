import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faProjectDiagram, faTable, faEnvelopeOpenText, faGrinAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/services/account/account.service';
import { AuthSubjectService } from '../../services/auth-subject/auth-subject.service';
import { Abilities } from '../../enums/Abilities'
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faProjectDiagram = faProjectDiagram;
  faTable = faTable;
  faEnvelopeOpenText = faEnvelopeOpenText;
  faGrinAlt = faGrinAlt;
  thereIsNewNotification: boolean = false;
  abilities: number[];
  Abilities = Abilities;
  userName: string;
  userEmail: string;

  constructor(private toastr: ToastrService, private router: Router, private authSubjectService: AuthSubjectService, private accountService: AccountService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null && localStorage.getItem("token") != undefined)
      this.logout();
    this.authSubjectService.getSubject().subscribe(res => {
      this.abilities = res.abilitiesIds;
      this.userName = res.name;
      this.userEmail = res.email
    })
  }



  logout() {
    let token = localStorage.getItem("token");
    this.accountService.Logout(token).subscribe(x => {
      localStorage.removeItem('token');
      localStorage.removeItem('abilitiesIds');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      this.authSubjectService.next({});
      this.toastr.success('Logout done successfully', 'Success');
      this.router.navigateByUrl('/account/login');
    });
  }
}
