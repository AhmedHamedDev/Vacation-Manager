import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl: string =  environment.apiEndpoint;

  constructor(private myclient:HttpClient) { }

  GetRoles(token: string) : Observable<any>{
    return this.myclient.get(`${this.baseUrl}/Roles/GetRoles`, {headers:{'token':token}})
  }

  DeleteRole(roleId ,token: string) : Observable<any>{
    return this.myclient.delete(`${this.baseUrl}/Roles/DeleteRole/`+roleId, {headers:{'token':token}})
  }

  AddRole(role: any ,token: string) : Observable<any>{
    return this.myclient.post(`${this.baseUrl}/Roles/AddRole`, {Name: role.name}, {headers:{'token':token}})
  }
}
