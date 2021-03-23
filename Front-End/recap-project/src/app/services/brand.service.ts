import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Brand } from '../models/entities/brand';
import { ResponseModel } from '../models/responses/response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44397/api/brands";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "/getall");
  }

  getBrandById(brandId:number):Observable<ItemResponseModel<Brand>> {
    return this.httpClient.get<ItemResponseModel<Brand>>(this.apiUrl + "/getbyid?brandId=" + brandId);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", brand)
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", brand)
  }

}
