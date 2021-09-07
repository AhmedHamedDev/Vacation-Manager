import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthSubjectService {

  private static data: UserData = new UserData();
  private static subject = new BehaviorSubject(AuthSubjectService.data);

  constructor() { 
    this.next({
      abilitiesIds: localStorage.getItem("abilitiesIds")?.split(',').map(x=>+x), 
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail")
    })
  }

  getSubject(){
    return AuthSubjectService.subject;
  }

  next(data){
    AuthSubjectService.data = data;
    AuthSubjectService.subject.next(data);
  }

  current(){
    return AuthSubjectService.subject.value;
  }
}
