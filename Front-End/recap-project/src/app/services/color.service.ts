import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Color } from 'src/app/models/entities/color';
import { ResponseModel } from '../models/responses/response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl ="https://localhost:44397/api/colors";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "/getall");
  }

  getColorById(colorId:number):Observable<ItemResponseModel<Color>> {
    return this.httpClient.get<ItemResponseModel<Color>>(this.apiUrl + "/getbyid?colorId=" + colorId);
  }

  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", color)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", color)
  }

}
