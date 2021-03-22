import { Payment } from './../models/entities/payment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44397/api/payments";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<Payment> {
    return this.httpClient.post<Payment>(this.apiUrl + "/add", payment)
  }

}
