import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Car } from './../models/entities/car';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44397/api/cars";

  constructor(private httpClient:HttpClient) { }

  getCarDetails(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "/getcardetails?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
