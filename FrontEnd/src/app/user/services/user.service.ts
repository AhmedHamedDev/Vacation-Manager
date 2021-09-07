import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string =  environment.apiEndpoint;

  constructor(private myclient:HttpClient) { }

  GetUserCheckIns(userId :string, token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/UserCheckIns/GetUserCheckIns/` + userId, {headers:{'token':token}})
  }
  
  GetCurrentUserCheckIns(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/UserCheckIns/GetCurrentUserCheckIns`, {headers:{'token':token}})
  }

  CurrentUserCheckInsCalculations(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/UserCheckIns/CurrentUserCheckInsCalculations`, {headers:{'token':token}})
  }

  UserCheckInsCalculations(userId :string, token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/UserCheckIns/UserCheckInsCalculations/`+userId, {headers:{'token':token}})
  }
}
