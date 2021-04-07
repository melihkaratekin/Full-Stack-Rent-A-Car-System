import { LocalStorageService } from './../../services/local-storage.service';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/entities/car-detail';
import { Rental } from 'src/app/models/entities/rental';
import { RentalService } from 'src/app/services/rental.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[] = [];
  rentalModel:Rental = new Rental();
  rentalInfos:Rental = new Rental();
  dataLoaded = false;
  totalPrice:any;

  constructor(private carService:CarService,
              private rentalService:RentalService,
              private localStorage:LocalStorageService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetails(params["carId"]);
      }
    });
  }

  setCarouselClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }

  getCarDetails(carId:number){
    this.carService.getCarsById(carId).subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getRentalId() {
    this.rentalService.getIdByRentalInfos(this.rentalModel.carId, this.rentalModel.customerId, this.rentalModel.rentDate, this.rentalModel.returnDate)
    .subscribe(response => this.rentalInfos = response.data)
  }

  calculateTotalPrice(rentDate:Date, returnDate:Date, dailyPrice:number) {
    var startDate = new Date(returnDate);
    var endDate = new Date(rentDate);

    var differenceBetweenDates = Math.floor((Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
                                            - Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()))
                                            /(1000 * 60 * 60 * 24));

    if(differenceBetweenDates == 0) {
      this.totalPrice = dailyPrice;
    }
    else {
      this.totalPrice = differenceBetweenDates * dailyPrice;
    }

    return this.totalPrice;
  }

  addRental(form:NgForm) {
    this.rentalModel.carId = this.carDetails[0].carId;
    this.rentalModel.customerId = Number(this.localStorage.get("customerId"));
    this.calculateTotalPrice(this.rentalModel.rentDate, this.rentalModel.returnDate, this.carDetails[0].dailyPrice)
    this.rentalService.addRental(this.rentalModel).subscribe(
      response => {
        this.toastrService.success("The car is rented. You redirect to payment page.");
        this.getRentalId();
        setTimeout(() => {
          this.router.navigate(['/payment/' + this.rentalInfos.rentalId + "/" + this.totalPrice + "/" + this.rentalModel.customerId]);
        }, 3000);
      },
      responseError => {
        this.toastrService.error(responseError.error.message);
      }
    )
  }

}
