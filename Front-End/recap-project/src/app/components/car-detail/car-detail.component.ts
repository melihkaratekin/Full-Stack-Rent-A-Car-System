import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/entities/car-detail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[] = [];
  imagePathList:string = "";
  dataLoaded = false;

  constructor(private carDetailService:CarDetailService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetails(params["carId"]);
      }
    });
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response => {
      this.carDetails = response.data;
      console.log(this.carDetails)
      this.dataLoaded = true;
    })
  }

  setClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }

}
