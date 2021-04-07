import { CustomerUser } from './../../models/entities/customer-user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/entities/car-detail';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  customerUser:CustomerUser;
  carDetails:CarDetail[] = [];
  dataLoaded = false;
  title = "Car Detail List";
  carFilterText = "";

  constructor(private carService:CarService,
              private cartService:CartService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"] && params["brandId"]) {
        this.getCarsByFilter(params["brandId"], params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      }
      else {
        this.getCarDetails();
      }
    })
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response)=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:Number) {
    this.carService.getCarsByBrand(brandId).subscribe((response)=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:Number) {
    this.carService.getCarsByColor(colorId).subscribe((response)=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByFilter(brandId:Number, colorId: Number) {
    this.carService.getCarsByFilter(brandId,colorId).subscribe((response)=>{
      this.carDetails = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(car:CarDetail) {
    if(car) {
      this.cartService.addToCart(car);
      this.toastrService.success(car.carName + " added to cart.")
    }
    else {
      this.toastrService.error("Error. Please try again.")
    }
  }

}
