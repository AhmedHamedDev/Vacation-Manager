import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from 'src/app/shared/models/ChangePassword';
import { LoginUser } from 'src/app/shared/models/LoginUser';
import { RegisterUser } from 'src/app/shared/models/RegisterUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string =  environment.apiEndpoint;

  constructor(private myclient:HttpClient) { }

  Login(user :LoginUser) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Account/Login`, {Email: user.email, Password: user.password})
  }
  
  Logout(token) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Account/Logout`, {headers:{'token':token}})
  }

  Register(user: RegisterUser) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Account/Register`, {Name: user.username ,Email: user.email, Password: user.password})
  }

  ActivateAccount(token :string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Account/ActivateAccount?token=` + token)
  }

  ChangePassword(password: ChangePassword, token: string) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Account/ChangePassword`, {OldPassword: password.oldPassword , NewPassword: password.newPassword}, {headers:{'token': token}})
  }
}
