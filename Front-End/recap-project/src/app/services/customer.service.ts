import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerUser } from '../models/entities/customer-user';
import { ItemResponseModel } from '../models/responses/item-response-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44397/api/customers";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "/getall");
  }

  getCustomersByEmail(email:string):Observable<ItemResponseModel<CustomerUser>> {
    return this.httpClient.get<ItemResponseModel<CustomerUser>>(this.apiUrl + "/getbyemail?email=" + email);
  }

}
