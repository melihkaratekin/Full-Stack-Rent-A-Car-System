import { Rental } from './../models/entities/rental';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44397/api/rentals";

  constructor(private httpClient:HttpClient) { }

  getRental(rentalId:Number):Observable<ItemResponseModel<Rental>> {
    return this.httpClient.get<ItemResponseModel<Rental>>(this.apiUrl + "/getbyid?rentalId=" + rentalId);
  }

  getIdByRentalInfos(carId:number, customerId:number, rentDate:Date, returnDate:Date):Observable<ItemResponseModel<Rental>> {
    return this.httpClient.get<ItemResponseModel<Rental>>(this.apiUrl + "/getidbyrentalinfos?carId=" + carId
                                                                                         + "&customerId=" + customerId
                                                                                         + "&rentDate=" + rentDate
                                                                                         + "&returnDate=" + returnDate);
  }

  addRental(rental:Rental):Observable<Rental> {
    return this.httpClient.post<Rental>(this.apiUrl + "/add", rental)
  }

}
