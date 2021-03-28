import { UserPasswordChangingModel } from './../models/entities/user-password-changing';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/entities/login-model';
import { SingleResponseModel } from '../models/responses/single-response-model';
import { TokenModel } from '../models/entities/token-model';
import { RegisterModel } from '../models/entities/register-model';
import { ResponseModel } from '../models/responses/response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44397/api/auth/';

  constructor(private httpClient:HttpClient,
              private localStorage:LocalStorageService) { }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  logout() {
    this.localStorage.remove("token")
    return true;
  }

  isAuthenticated() {
    if(this.localStorage.get("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  updateUserPassword(userPasswordChangingModel:UserPasswordChangingModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "changepassword", userPasswordChangingModel)
  }

}
