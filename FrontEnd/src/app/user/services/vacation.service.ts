import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private baseUrl: string =  environment.apiEndpoint;

  constructor(private myclient:HttpClient) { }

  GetCurrentUserVacations(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Vacation/GetCurrentUserVacations`, {headers:{'token':token}})
  }

  DeleteVacation(vacationId: number, token: string) : Observable<any>{
    return this.myclient.delete(`${this.baseUrl}/Vacation/DeleteVacation/`+vacationId, {headers:{'token':token}})
  }

  AddVacation(description: string, date: string, token: string) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Vacation/AddVacation`, {Description: description, Date: date}, {headers:{'token':token}})
  }

  GetUserVacations(userId: string, token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Vacation/GetUserVacations/`+userId, {headers:{'token':token}})
  }

  ChangeVacationStatus(VacationId: string, StatusId: number, token: string) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Vacation/ChangeVacationStatus`, {StatusId: StatusId, VacationId: VacationId}, {headers:{'token':token}})
  }
}
