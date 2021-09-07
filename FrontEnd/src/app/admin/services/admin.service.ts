import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string =  environment.apiEndpoint;

  constructor(private myclient:HttpClient) { }

  GetAllOtherUsers(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Admin/GetAllOtherUsers`, {headers:{'token':token}})
  }

  GetHolidays(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Holidays/GetHolidays`, {headers:{'token':token}})
  }

  DeleteHoliday(holidayId ,token: string) : Observable<any>{
    return this.myclient.delete(`${this.baseUrl}/Holidays/DeleteHoliday/`+holidayId, {headers:{'token':token}})
  }

  AddHoliday(holiday: any ,token: string) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Holidays/AddHoliday`, {Name: holiday.name, Date: holiday.holidayDate}, {headers:{'token':token}})
  }
}
