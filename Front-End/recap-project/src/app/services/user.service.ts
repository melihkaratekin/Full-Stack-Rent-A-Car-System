import { UserInfos } from './../models/entities/user-infos';
import { Injectable } from '@angular/core';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responses/response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44397/api/users";

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<ItemResponseModel<UserInfos>> {
    return this.httpClient.get<ItemResponseModel<UserInfos>>(this.apiUrl + "/getbyemail?email=" + email);
  }

  updateUserInfos(user:UserInfos):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/updateinfos", user)
  }

}
