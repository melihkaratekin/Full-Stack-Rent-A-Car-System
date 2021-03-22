import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Car } from '../models/entities/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44397/api/cars";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "/getcarsbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "/getcarsbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:Number,colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + `/getcarsbyfilter?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
