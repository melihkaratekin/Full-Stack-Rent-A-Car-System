import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { CreditCard } from 'src/app/models/entities/credit-card';
import { ResponseModel } from '../models/responses/response-model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl ="https://localhost:44397/api/creditcards";

  constructor(private httpClient:HttpClient) { }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl + "/getbycustomerid?customerId=" + customerId);
  }

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", creditCard)
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", creditCard)
  }

}
